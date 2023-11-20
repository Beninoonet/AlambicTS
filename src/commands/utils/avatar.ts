import { Command } from '@sapphire/framework';
import { ApplicationCommandType, EmbedBuilder } from 'discord.js';


export class AvatarCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, { ...options });
    }

    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerContextMenuCommand((builder) =>
            builder //
                .setName('avatar')
                .setType(ApplicationCommandType.User)
        );
    }

    public async contextMenuRun(interaction: Command.ContextMenuCommandInteraction) {
        const user = await interaction.client.users.fetch(interaction.targetId)
        const embed = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`${user.displayName}'s Avatar`)
            .setURL(`${user.avatarURL()}`)
            .setImage(`${user.displayAvatarURL({ size: 1024 })}`)
        interaction.reply({
            embeds: [embed]
        })
    }
}
