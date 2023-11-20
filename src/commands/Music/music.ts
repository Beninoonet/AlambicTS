import { Command } from '@sapphire/framework';


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

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        const guildId = interaction.client.guilds.cache.get(`${interaction.guild?.id}`)
        const member = guildId?.members.cache.get(`${interaction.member?.user.id}`)
        const query = interaction.options.getString('query');
    }
}