import { Command } from '@sapphire/framework';
import { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';


export class ClearCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            requiredUserPermissions: 'Administrator',
            requiredClientPermissions: 'SendMessages'
        });
    }

    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder
                .setName('tsetup')
                .setDescription("Met en place le système de tickets")
        );
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {

        const embed = new EmbedBuilder()
            .setTitle('TICKET')
            .setDescription("Vous avez besoin de l'aide d'un modérateur ? N'hésite pas à créer un ticket !")
            .setColor('Red')



        const tickets = new ActionRowBuilder<ButtonBuilder>({
            components: [
                new ButtonBuilder({
                    custom_id: "ticket",
                    label: "Créer un ticket",
                    style: ButtonStyle.Danger,
                    emoji: "👮"
                })
            ]
        });

        interaction.reply({
            content: `Mise en place du système de tickets`,
            ephemeral: true
        });

        await interaction.channel?.send({
            embeds: [embed],
            components: [tickets]
        });



    }
}