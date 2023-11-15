import { Listener } from '@sapphire/framework';
import type { VoiceState } from 'discord.js';

export class ReadyListener extends Listener {
    public async run(oldUser: VoiceState, newUser: VoiceState,) {
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
