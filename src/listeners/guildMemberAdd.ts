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

        /* VAR CHANNEL WELCOME*/
        const chanID = process.env.WLC_ID;
        const wlcChan = member.guild.channels.cache.get(`${chanID}`);
        /* ADDING A ROLE */
        member.roles.add('1200453898813575218');
        (wlcChan as TextChannel).send({
            content: `Bienvenue ${member} sur ${member.guild.name}`
        })

    }

}