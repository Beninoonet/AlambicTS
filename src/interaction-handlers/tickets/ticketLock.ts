import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import { ChannelType, EmbedBuilder, type ButtonInteraction } from 'discord.js';
import * as dotenv from 'dotenv';
dotenv.config();

export class ButtonHandler extends InteractionHandler {
    public constructor(ctx: InteractionHandler.Context, options: InteractionHandler.Options) {
        super(ctx, {
            ...options,
            interactionHandlerType: InteractionHandlerTypes.Button
        });
    }

    public override parse(interaction: ButtonInteraction) {
        if (interaction.customId !== 'lock') return this.none();
        return this.some();
    }

    public async run(interaction: ButtonInteraction) {
        const { customId } = interaction;
        const Embed = new EmbedBuilder().setColor('DarkBlue');
        let category = interaction.guild?.channels.cache.find(channel => channel.type == ChannelType.GuildCategory && channel.name === "tickets");

        if (!category) {
            interaction.reply({
                content: `La catégorie "tickets" n'existe pas`,
                ephemeral: true
            })
        } else {
            const channelID = interaction.channel?.id;
            const chan = interaction.guild?.channels.cache.find(ch => ch.id == `${channelID}`)

        }

    }
}