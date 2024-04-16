import { guild } from '../../main.mjs';
import { EmbedBuilder } from 'discord.js';

export async function memberRoleAddEventHandler(member, role) {
    const channel = guild.channels.cache.get('1228013450870001788');
    const embed = new EmbedBuilder()
        .setTitle('Role Added')
        .setDescription(`The role ${role.name} has been added to ${member.user.username}`)
        .setColor('#00ff00');
    channel.send({ embeds: [embed] });
}