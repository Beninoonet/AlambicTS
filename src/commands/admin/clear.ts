import { Command } from '@sapphire/framework';
import { EmbedBuilder, TextChannel } from 'discord.js';


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
                .addNumberOption(option => {
                    return option
                        .setName('amount')
                        .setRequired(true)
                        .setDescription('Spécifié le nombre de message à supprimer')
                        .setMinValue(1)
                }),
        );
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {

        const amount = interaction.options.getNumber('amount');

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.client.user.username}`, iconURL: `${interaction.client.user.displayAvatarURL()}` })
            .setColor('Red')
            .setTimestamp()

        if (amount) {
            /* DELETE MESSAGE */
            (interaction.channel as TextChannel).bulkDelete(amount, true);

            /* EMBED FORTIFICATION */
            embed.setTitle(`${amount} message(s) supprimé(s)`)
            embed.addFields({ name: `Commande effecuté par`, value: `${interaction.user}` })
                .setThumbnail(`${interaction.user.displayAvatarURL()}`)
        };

        interaction.reply({
            embeds: [embed]
        }).then(msg => {
            setTimeout(() => msg.delete(), 5000);
            this.container.logger.info(`${interaction.commandName} erased last message without problem`)
        })
    }
}