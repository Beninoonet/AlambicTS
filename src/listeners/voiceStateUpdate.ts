import { Listener } from '@sapphire/framework';
import type { VoiceState, Client } from 'discord.js';

export class VoiceStateListener extends Listener {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            once: true,
            event: 'voiceStateUpdate'
        });
    }
    run(oldUser: VoiceState, newUser: VoiceState, client: Client) {

        let newUserChannel = newUser.channelId;
        let oldUserChannel = oldUser.channelId;

        if (oldUserChannel == undefined && newUserChannel !== undefined) {
            console.log("Joined VC")
        }
        else if (newUserChannel == undefined) {
            console.log("Quit")
        }
    }

}


