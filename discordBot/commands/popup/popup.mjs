import { EmbedBuilder } from 'discord.js';

const data = {
    name: 'popup',
    description: 'Replies with a random popup from all of the added ones!',
    execute: execute
};
export default data;

export async function execute(interaction) {

    const image = await fetch('http://5.135.74.201:1570/getRandomImage').then(response => {return response.text()});

    const popupEmbed = new EmbedBuilder()
	.setColor(0xDA70D6)
	.setTitle('Horny popup for horny cutie')
	.setImage('http://5.135.74.201:1570/images/' + image)
	.setTimestamp()
	.setFooter({ text: 'There you go cutie ❤' });

    await interaction.reply({ embeds: [popupEmbed] });
}


