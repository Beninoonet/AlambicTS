import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import { createTranscript } from 'discord-html-transcripts';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, EmbedBuilder, PermissionFlagsBits, TextChannel, type ButtonInteraction } from 'discord.js';
import * as dotenv from 'dotenv';
dotenv.config();


export class ButtonHandler extends InteractionHandler {
    public constructor(ctx: InteractionHandler.Context, options: InteractionHandler.Options) {
        super(ctx, {
            ...options,
            interactionHandlerType: InteractionHandlerTypes.Button,
        });
    };

    public override parse(interaction: ButtonInteraction) {
        if (interaction.customId !== 'save') return this.none();
        return this.some();
    };

    public async run(interaction: ButtonInteraction) {
        const ChannelId = interaction.channel?.id
        const channelfind = interaction.guild?.channels.cache.find(ch => ch.id === `${ChannelId}`)
        const channel = (await channelfind as TextChannel)
        let category = interaction.guild?.channels.cache.find(channel => channel.type == ChannelType.GuildCategory && channel.name === "tickets")

        if (!category && channel.parent === category) {
            interaction.reply(`Ce ticket n'est pas dans la catégories "ticket"`)
        };

        const Embed = new EmbedBuilder()
            .setTitle(`${channel.name}`)
            .setColor('Green');

        const attachment = await createTranscript(channel, {
            limit: -1,
            filename: `${channel.name}.html`
        });

        const Member = interaction.member?.user
        const Message = (await interaction.guild?.channels.cache.get(`${process.env.TRANSCRIPT_ID}`) as TextChannel).send({
            embeds: [Embed.setAuthor({ name: `${Member?.username}` })],
            files: [attachment],
        });

        interaction.reply({
            embeds: [
                Embed.setDescription(`Le ticket est désormais enregistré et va fermer d'ici peu. Transcription [disponible ici](${(await Message).url})`)
            ]
        }).then(msg => {
            setTimeout(() => msg.delete(), 5000);
            this.container.logger.info(`Transcription enregistré`)
        })
    }
}
