import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import type { ButtonInteraction } from 'discord.js';

export class ButtonHandler extends InteractionHandler {
    public constructor(ctx: InteractionHandler.Context, options: InteractionHandler.Options) {
        super(ctx, {
            ...options,
            interactionHandlerType: InteractionHandlerTypes.Button
        });
    }

    public override parse(interaction: ButtonInteraction) {
        if (interaction.customId !== 'ticket') return this.none();

        return this.some();
    }

    public async run(interaction: ButtonInteraction) {
        await interaction.reply({
            content: 'Ui',
            // Let's make it so only the person who pressed the button can see this message!
            ephemeral: true
        });
    }
}