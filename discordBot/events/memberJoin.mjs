import { EmbedBuilder, cleanCodeBlockContent } from "discord.js";
import { Canvas } from "canvas";

import { guild } from '../main.mjs';

export async function memberJoinEventHandler(member) {

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    // Load the background image
    const background = await Canvas.loadImage('http://5.135.74.201/images/661cbb80d900f1b520d50074.png.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Add text to the image
    ctx.font = '48px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Welcome to the server, ${member.displayName}!`, 50, canvas.height / 2);

    // Send the image as an attachment
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome_image.png');
    
    const channel = guild.channels.cache.get('1228013450870001788');
    channel.send(attachment);

    channel.send(`Your profile, ${message.author}!`, attachment);


}