import { Command, Err, err } from '@sapphire/framework';
import { EmbedBuilder, GuildMember } from 'discord.js';

export class MusicCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            requiredUserPermissions: 'SendMessages',
            requiredClientPermissions: 'SendMessages'
        });
    }

    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder
                .setName('music')
                .setDescription("Lancer une musique")
                .addStringOption(option => {
                    return option
                        .setName('query')
                        .setRequired(true)
                        .setDescription('Lien/Nom')
                }),
        );
    }

    public chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        interaction.reply({
            content: "IN DEVELOPEMENT",
            ephemeral: true
        })
    }
}