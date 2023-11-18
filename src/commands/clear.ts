import { Command } from '@sapphire/framework';

export class ClearCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            requiredUserPermissions: 'ManageMessages',
            requiredClientPermissions: 'ManageMessages'
        });
    }

    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder
                .setName('clear')
                .setDescription("Permet d'effacer un nombre de messages précis ")
        );
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    }
}