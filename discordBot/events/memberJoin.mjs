import { EmbedBuilder, cleanCodeBlockContent, AttachmentBuilder } from "discord.js";
import { Canvas } from "canvas";
import { createCanvas, loadImage } from "canvas";


import { guild } from '../main.mjs';

export async function memberJoinEventHandler(member) {

    const canvas = createCanvas(700, 400);
    const ctx = canvas.getContext('2d');

    // Load the background image
    const background = await loadImage('./discordBot/events/welcome.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Add text to the image
    ctx.font = '24px sans-serif';
    ctx.fillStyle = '#ffffff';

    const welcomeText = 'Welcome to the server';
    const welcomeTextWidth = ctx.measureText(welcomeText).width;
    const welcomeTextX = (canvas.width - welcomeTextWidth) / 2;
    ctx.fillText(welcomeText, welcomeTextX, canvas.height / 2 -30);

    const memberText = `${member.user.username}!`;
    const memberTextWidth = ctx.measureText(memberText).width;
    const memberTextX = (canvas.width - memberTextWidth) / 2;
    ctx.fillText(memberText, memberTextX, canvas.height / 2);

    const memberNumberText = `You are the ${guild.memberCount}th member`;
    const memberNumberTextWidth = ctx.measureText(memberNumberText).width;
    const memberNumberTextX = (canvas.width - memberNumberTextWidth) / 2;
    ctx.fillText(memberNumberText, memberNumberTextX, canvas.height / 2 + 60);

    // Send the image as an attachment
    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'welcome_image.png' });
    
    const channel = guild.channels.cache.get('1228013450870001788');
    channel.send({ files: [attachment]});


}