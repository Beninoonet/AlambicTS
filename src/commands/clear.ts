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
                        .setName('nombre')
                        .setRequired(true)
                        .setDescription('Spécifié le nombre de message à supprimer')
                        .setMinValue(1)
                }),
        );
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {

        const amount = interaction.options.getNumber('nombre');

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.client.user.username}`, iconURL: `${interaction.client.user.displayAvatarURL()}` })
            .setColor('Red')
            .setTimestamp()

        if (amount) {
            (interaction.channel as TextChannel).bulkDelete(amount, true);
            embed.setTitle(`${amount} message(s) supprimé(s)`)
            embed.addFields({ name: `Commande effecuté par`, value: `Salon: ${interaction.user.displayName}` })
        }

    }
}