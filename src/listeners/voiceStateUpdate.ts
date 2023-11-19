import { Events, Listener } from '@sapphire/framework';
import { WebhookClient, type VoiceState, EmbedBuilder } from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();

export class VoiceStateListener extends Listener {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            event: Events.VoiceStateUpdate
        });
    }
    run(oldUser: VoiceState, newUser: VoiceState) {
        const webhookVoice = new WebhookClient({ url: `${process.env.VOICE_WEBHOOK}` })
        let voiceEmbed = new EmbedBuilder()
            .setTimestamp()
        let newUserGuild = newUser.guild.id
        let newUserChannel = newUser.channelId;
        let oldUserChannel = oldUser.channelId;

        if (newUserGuild === process.env.GUILD_ID) {
            if (oldUserChannel == undefined && newUserChannel !== undefined) {
                voiceEmbed.setTitle(`${newUser.member?.user.displayName} est en vocal.`)
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
                this.container.logger.info(`${newUser.member?.user.username} a rejoint le salon : ${newUser.channel?.name} | Serveur : ${oldUser.guild.name} `)
            }
            else if (newUserChannel == undefined) {
                this.container.logger.info(`${oldUser.member?.user.username} a quitté le salon : ${oldUser.channel?.name} | Serveur : ${oldUser.guild.name} `)
            }
        }
    }

}


