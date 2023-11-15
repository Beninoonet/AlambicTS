import { Listener } from '@sapphire/framework';
import { WebhookClient, type VoiceState, EmbedBuilder, Client } from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();

export class VoiceStateListener extends Listener {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            once: false,
            event: 'voiceStateUpdate'
        });
    }
    run(oldUser: VoiceState, newUser: VoiceState, client: Client) {

        const webhookVoice = new WebhookClient({ url: `${process.env.VOICE_WEBHOOK}` })

        let embed = new EmbedBuilder()
            .setTitle('Nouvelle personne en vocal')
            .setTimestamp()

        let newUserChannel = newUser.channelId;
        let oldUserChannel = oldUser.channelId;

        if (oldUserChannel == undefined && newUserChannel !== undefined) {
            embed.addFields({
                name: `${newUser.member?.nickname}`,
                value: `A rejoint le salon ${newUser.channel}`
            })
            embed.setThumbnail(`${newUser.member?.displayAvatarURL({ size: 1024 })}`)
            webhookVoice.send({ embeds: [embed] })
            console.log("Joined VC")
        }
        else if (newUserChannel == undefined) {
            console.log("Quit")
        }
    }

}


