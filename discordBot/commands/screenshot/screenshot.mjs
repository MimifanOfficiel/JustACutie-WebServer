import { EmbedBuilder } from "discord.js";

const data = {
    name: 'screenshot',
    description: "Replies with a random screenshot taken from cuties' PCs :3!",
    execute: execute
};
export default data;

export async function execute(interaction) {

    const screenshot = await fetch('http://5.135.74.201:1570/getRandomScreenshot').then(response => {return response.json()});

    const popupEmbed = new EmbedBuilder()
	.setColor(0xF44336)
	.setTitle('There is a random screenshot !')
    .setDescription('This is from a cutie whose PC name is ' + screenshot.cutie)
	.setImage(`http://5.135.74.201:1570/screenshots/${screenshot.choosenDate}/${screenshot.cutie}/${screenshot.screenshot}`)
	.setTimestamp()
	.setFooter({ text: 'There you go cutie ❤' });

    await interaction.reply({ embeds: [popupEmbed] });

}