import { Events, Listener } from '@sapphire/framework';
import { ActivityType, Client, EmbedBuilder, WebhookClient } from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();

export class ReadyListener extends Listener {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            once: true,
            event: Events.ClientReady
        });

    }
    run(client: Client) {
        const { username, id } = client.user!;
        this.container.logger.info(`Successfully logged in as ${username} (${id})`);
        client.user?.setActivity(`Lov U`, { type: ActivityType.Watching })

        /* Logging */

        const LogHook = new WebhookClient({ url: `${process.env.LOGS_WEBHOOK}` })
        const Logs = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`🟢 ${username}'s System | Logs`)
            .setDescription(`ID : ${id}`)
            .addFields({
                name: `🛜 Service`,
                value: `🟢 Actif`,
                inline: true
            })
            .addFields({
                name: `🤖 Commands`,
                value: `🟢 Actif`,
                inline: true
            })
            .addFields({
                name: `🏠 Nombre(s) de discord`,
                value: `${client.guilds.cache.size}`,
                inline: false
            })
            .addFields({
                name: `💝 Mode Kawai`,
                value: `🟢 Actif`,
                inline: false
            })
            .setTimestamp()
            .setThumbnail(`${client.user?.displayAvatarURL({ size: 1024 })}`)
            .setFooter({
                text: `${client.guilds.cache.get('1109634584225792091')?.name}`,
                iconURL: `${client.guilds.cache.get('1109634584225792091')?.iconURL()}`
            })
        LogHook.send({
            embeds: [Logs]
        })
    }

}


