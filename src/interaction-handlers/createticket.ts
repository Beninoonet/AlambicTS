import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import { ChannelType, Guild, PermissionsBitField, TextChannel, type ButtonInteraction } from 'discord.js';

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
        const category = interaction.guild?.channels.cache.find(channel => channel.type == ChannelType.GuildCategory && channel.name === "tickets")

        if (!category) {
            interaction.reply({
                content: "La catégories 'tickets' n'existe pas"
            });
        }
        else {
            const ticketCh = interaction.guild?.channels.create({
                name: `Ticket de ${interaction.user.username}`,
                type: ChannelType.GuildText,
                parent: category.id,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel]
                    },
                    {
                        id: interaction.user.id,
                        allow: [PermissionsBitField.Flags.SendMessages]
                    }
                ]
            });
            (await ticketCh)?.send({
                content: `Comment pouvons-nous t'aider ? ${interaction.user.username}`
            })
        }
    }
}