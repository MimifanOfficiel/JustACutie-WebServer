import { EmbedBuilder, cleanCodeBlockContent } from "discord.js";
import { registerFont, createCanvas, loadImage } from "canvas";
import { Canvas } from "canvas";

import { guild } from '../main.mjs';

export async function memberJoinEventHandler(member) {

    const canvas = createCanvas(500, 500);
    const ctx = canvas.getContext('2d');

    const backgroundImage = loadImage("http://5.135.74.201/images/661cbb80d900f1b520d50074.png.jpg");
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);  

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await loadImage(member.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(avatar, 25, 25, 200, 200);
    ctx.fillText('Everyone hates this font :(', 250, 10);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

    const channel = guild.channels.cache.get('1228013450870001788');

    channel.send(`Your profile, ${message.author}!`, attachment);


}