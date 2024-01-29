import { Command } from '@sapphire/framework';
import { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';


export class ClearCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            requiredUserPermissions: 'Administrator',
            requiredClientPermissions: 'Administrator'
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

        const createticket = new ButtonBuilder()
            .setCustomId('create-ticket')
            .setEmoji('📕')
            .setLabel('Ouvrir un ticket')
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder()
            .addComponents(createticket);

        await interaction.reply({
            embeds: [embed]
        })

    }
}