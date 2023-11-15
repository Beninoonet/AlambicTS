import { Listener } from '@sapphire/framework';
import { Client, EmbedBuilder, GuildMember, WebhookClient } from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();

export class GuildMemberAddListener extends Listener {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            once: false,
            event: 'guildMemberAdd'
        });
    }
    run(member: GuildMember) {
        console.log(member)
    }

}