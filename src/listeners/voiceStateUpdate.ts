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
        /* WebHook Voice */
        const webhookVoice = new WebhookClient({ url: `${process.env.VOICE_WEBHOOK}` })
        let voiceEmbed = new EmbedBuilder()
            .setTimestamp()
        /* Store a id */
        let newUserGuild = newUser.guild.id
        let newUserChannel = newUser.channelId;
        let oldUserChannel = oldUser.channelId;
        /* Logging */
        const LogHook = new WebhookClient({ url: `${process.env.LOGS_WEBHOOK}` })
        const Logs = new EmbedBuilder()
            .setColor('Blue')
            .setTimestamp()

        if (newUserGuild === process.env.GUILD_ID) {
            if (oldUserChannel == undefined && newUserChannel !== undefined) {
                /* Announcement */
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
                /* Logging */
                Logs.setTitle(`🟢 Voice Activity | Logs`)
                Logs.addFields({
                    name: `🍻 Salon`,
                    value: `${newUser.channel}`
                })
                Logs.addFields({
                    name: `👤 Membre`,
                    value: `${newUser.member}`
                })
                Logs.addFields({
                    name: `Activité du salon`,
                    value: `${newUser.channel?.members.size} Membre(s)`
                })
                Logs.setFooter({
                    text: `${newUser.guild.name}`,
                    iconURL: `${newUser.guild.iconURL()}`
                })
                Logs.setThumbnail(`${oldUser.member?.user.displayAvatarURL({ size: 1024 })}`)
                LogHook.send({
                    embeds: [Logs]
                })
                this.container.logger.info(`${newUser.member?.user.username} a rejoint le salon : ${newUser.channel?.name} | Serveur : ${oldUser.guild.name} `)
            }
            else if (newUserChannel == undefined) {
                /* Logging */
                Logs.setTitle(`🔴 Voice Activity | Logs`)
                Logs.addFields({
                    name: `🍻 Salon`,
                    value: `${oldUser.channel}`
                })
                Logs.addFields({
                    name: `👤 Membre`,
                    value: `${oldUser.member}`
                })
                Logs.addFields({
                    name: `Activité du salon`,
                    value: `${oldUser.channel?.members.size} Membre(s)`
                })
                Logs.setFooter({
                    text: `${oldUser.guild.name}`,
                    iconURL: `${oldUser.guild.iconURL()}`
                })
                Logs.setThumbnail(`${oldUser.member?.user.displayAvatarURL({ size: 1024 })}`)
                LogHook.send({
                    embeds: [Logs]
                })

                this.container.logger.info(`${oldUser.member?.user.username} a quitté le salon : ${oldUser.channel?.name} | Serveur : ${oldUser.guild.name} `)
            }
        }
    }

}


