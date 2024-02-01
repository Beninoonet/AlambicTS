import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, EmbedBuilder, WebhookClient, type ButtonInteraction } from 'discord.js';
import * as dotenv from 'dotenv';
dotenv.config();

export class ButtonHandler extends InteractionHandler {
    public constructor(ctx: InteractionHandler.Context, options: InteractionHandler.Options) {
        super(ctx, {
            ...options,
            interactionHandlerType: InteractionHandlerTypes.Button
        });
    }

    public override parse(interaction: ButtonInteraction) {
        if (interaction.customId !== 'ticket') return this.none();
        return this.some();
    }

    public async run(interaction: ButtonInteraction) {
        const { customId } = interaction
        let category = interaction.guild?.channels.cache.find(channel => channel.type == ChannelType.GuildCategory && channel.name === "tickets")

        if (!category) {
            interaction.reply({
                content: "La catégories 'tickets' n'existe pas",
                ephemeral: true
            });

            interaction.guild?.channels.create({
                name: 'tickets',
                type: ChannelType.GuildCategory
            })
        }
        else {

            /**Create a ticket */
            const embed = new EmbedBuilder()
                .setTitle('Ticket')
                .setDescription(`Bonjour/Bonsoir, ${interaction.user}.\n **Afin que nous puissions répondre au plus vite 
                 à ton ticket merci de nous expliquer \n la raison de sa création.**`)
                .setImage(`${interaction.guild?.iconURL({ size: 256 })}`)
                .setColor('Yellow')
                .setTimestamp()
                .setAuthor({
                    name: interaction.client.user.username,
                    iconURL: `${interaction.client.user.displayAvatarURL()}`
                });
            const ID = Math.floor(Math.random() * 1000) + 5;
            let ticketCh = interaction.guild?.channels.create({
                name: `${customId}-${ID}`,
                type: ChannelType.GuildText,
                parent: category.id,
                permissionOverwrites: [
                    {
                        id: `${interaction.member?.user.id}`,
                        allow: ["SendMessages", "ViewChannel", "ReadMessageHistory"]
                    },
                    {
                        id: `${process.env.MOD_ID}`,
                        allow: ["SendMessages", "ViewChannel", "ReadMessageHistory"]
                    },
                    {
                        id: `${interaction.guild.id}`,
                        deny: ["SendMessages", "ViewChannel", "ReadMessageHistory"]
                    }
                ]
            });

            /** Create a buttonOps */
            const buttonOps = new ActionRowBuilder<ButtonBuilder>({
                components: [
                    new ButtonBuilder({
                        custom_id: "save",
                        label: "Sauvegarder et fermer le ticket",
                        style: ButtonStyle.Success,
                        emoji: "💾"
                    }),
                    new ButtonBuilder({
                        custom_id: "lock",
                        label: "Verrouiller",
                        style: ButtonStyle.Secondary,
                        emoji: "🔒"
                    }),
                    new ButtonBuilder({
                        custom_id: "unlock",
                        label: "Déverrouiller",
                        style: ButtonStyle.Secondary,
                        emoji: "🔓"
                    })
                ]
            });


            /** Sending message in tickets */
            (await ticketCh)?.send({
                content: `||${interaction.user}||`,
                embeds: [embed],
                components: [buttonOps]
            })

            interaction.reply({
                content: `${interaction.user}, ton ticket à été créé juste ici ${(await ticketCh)}`,
                ephemeral: true
            })

            /* Logging */
            const LogHook = new WebhookClient({ url: `${process.env.LOGS_WEBHOOK}` })
            const Logs = new EmbedBuilder()
                .setColor('Blue')
                .setTimestamp()
                .setTitle(`Nouveau tickets créé par ${interaction.user.username}`)
                .setDescription(`Ticket: ${((await ticketCh)?.name)
                    } `)
            LogHook.send({
                embeds: [Logs]
            })


        }
    }
}