import { Command } from '@sapphire/framework';
import { ChannelType, EmbedBuilder, TextChannel } from 'discord.js';


export class ClearCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            requiredUserPermissions: 'BanMembers',
            requiredClientPermissions: 'SendMessages'
        });
    }

    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder
                .setName('tadd')
                .setDescription("Permet de rajouter un membre au tickets")
                .addUserOption(options => {
                    return options
                        .setName('member')
                        .setDescription('Sélectionne le membre à ajouter au salon')
                        .setRequired(true)

                })
        );
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        const member = interaction.options.getUser('member')

        const embed = new EmbedBuilder().setAuthor({
            name: interaction.client.user.username,
            iconURL: interaction.client.user.displayAvatarURL()
        })

        const ChannelId = interaction.channel?.id
        const channelfind = interaction.guild?.channels.cache.find(ch => ch.id === `${ChannelId}`)
        const channel = (await channelfind as TextChannel)
        let category = interaction.guild?.channels.cache.find(channel => channel.type == ChannelType.GuildCategory && channel.name === "tickets")

        if (!category || channel.parent !== category) {
            interaction.reply({
                embeds: [embed.setTitle(`Ticket: Erreur`).setDescription(`Ce salon n'est pas dans la catégorie **"tickets"** !`).setColor('Red')],
                ephemeral: true
            })
        } else {

            channel.permissionOverwrites.set([
                {
                    id: `${member?.id}`,
                    allow: ['SendMessages', 'ViewChannel', 'ReadMessageHistory']

                }

            ])
            interaction.reply({
                content: `${member}`,
                embeds: [embed
                    .setTitle('Nouveau membre ajoutés au ticket')
                    .setThumbnail(`${member?.displayAvatarURL({ size: 256 })}`)
                    .setColor('Blue')
                    .setTimestamp()
                    .setFooter({
                        text: `${interaction.guild?.name}`,
                        iconURL: `${interaction.guild?.iconURL()}`
                    })
                ]
            })
        }



    }
}