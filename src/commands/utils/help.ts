import { Command } from '@sapphire/framework';
import { EmbedBuilder } from 'discord.js';

export class HelpCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            requiredClientPermissions: "SendMessages"
        });
    }

    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder
                .setName('help')
                .setDescription("Besoin d'aide ?")
        );
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {

        const commands = interaction.client.application.commands.cache
        const embed = new EmbedBuilder()
            .setColor('Red')
            .setAuthor({ name: interaction.user.username, iconURL: `${interaction.user.displayAvatarURL({ size: 1024 })}` })
            .setTitle('HELP COMMAND')
            .setDescription(`**/help [PAGE]** \n Commande créé: ${commands.size} \n Commande accessible: 1 `)
            .addFields([{ name: `/help`, value: `Une perte de mémoire ? Toutes les commandes sont ici. \n *Permission: **ALL***` }])


        interaction.reply({
            embeds: [embed]
        })
    }
}