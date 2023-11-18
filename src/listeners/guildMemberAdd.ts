import { Events, Listener } from '@sapphire/framework';
import { GuildMember, TextChannel } from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();

export class GuildMemberAddListener extends Listener {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            once: false,
            event: Events.GuildMemberAdd
        });
    }
    run(member: GuildMember) {
        const chanID = "1145415930969604208";

        console.log(member);

        const message = `Welcome to server, ${member.user.username}`;

        const channel = member.guild.channels.cache.get(chanID);;

        (channel as TextChannel).send(message);
    }

}