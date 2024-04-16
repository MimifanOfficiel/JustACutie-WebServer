import { EmbedBuilder } from 'discord.js';

const data = {
    name: 'avatar',
    description: "Replies with a user's avatar!",
    execute: execute,
    // options : [
    //     {
    //         name: 'user',
    //         type: 'USER',
    //         description: 'The user',
    //         required: true,
    //     },
    // ],
};
export default data;

export async function execute(interaction) {
    const user = interaction.options.getUser('user');
    const image = user.avatar;

    const popupEmbed = new EmbedBuilder()
	.setColor(0xDA70D6)
	.setTitle('Here is the avatar of ' + user.username)
	.setImage(image)
	.setTimestamp()
	.setFooter({ text: 'There you go cutie ❤' });

    await interaction.reply({ embeds: [popupEmbed] });
}


