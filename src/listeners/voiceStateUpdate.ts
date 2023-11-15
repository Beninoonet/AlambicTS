import { Listener } from '@sapphire/framework';
import { WebhookClient, type VoiceState, EmbedBuilder } from 'discord.js';
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
    run(oldUser: VoiceState, newUser: VoiceState) {

        const webhookVoice = new WebhookClient({ url: `${process.env.VOICE_WEBHOOK}` })

        let voiceEmbed = new EmbedBuilder()
            .setTimestamp()

        let newUserChannel = newUser.channelId;
        let oldUserChannel = oldUser.channelId;

        if (oldUserChannel == undefined && newUserChannel !== undefined) {
            voiceEmbed.setTitle(`${newUser.member?.nickname} est en vocal.`)
            voiceEmbed.addFields({
                name: `Salon`,
                value: `${newUser.channel}`
            })
            voiceEmbed.addFields({
                name: `Activité du salon`,
                value: `${newUser.channel?.members.size} Membre(s)`
            })
            voiceEmbed.setThumbnail(`${newUser.member?.displayAvatarURL({ size: 1024 })}`)
            webhookVoice.send({ embeds: [voiceEmbed] })
            console.log("Joined VC")
        }
        else if (newUserChannel == undefined) {
            console.log("Quit")
        }
    }

}


