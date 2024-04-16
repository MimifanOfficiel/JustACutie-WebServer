import { EmbedBuilder } from "discord.js";

const data = {
    name: 'screenshot',
    description: "Replies with a random screenshot taken from cuties' PCs :3!",
    execute: execute
};
export default data;

const cooldownDuration = 30 * 1000;
let lastExecutionTime = 0;

export async function execute(interaction) {

    // Check if the cooldown period has passed
    const currentTime = Date.now();
    if (currentTime - lastExecutionTime < cooldownDuration) {
        interaction.reply({ content: `Please wait ${Math.ceil((cooldownDuration - (currentTime - lastExecutionTime)) / 1000)} seconds before reusing the \`${data.name}\` command.`, ephemeral: true });
        return;
    }

    // Update the last execution time
    lastExecutionTime = currentTime;

    // Rest of the code...
    const screenshot = await fetch('http://5.135.74.201:1570/getRandomScreenshot').then(response => {return response.json()});

    const popupEmbed = new EmbedBuilder()
        .setColor(0xF44336)
        .setTitle('There is a random screenshot !')
        .setDescription('This is from a cutie whose PC name is ' + screenshot.cutie)
        .setImage(`http://5.135.74.201:1570/screenshot/${screenshot.choosenDate}/${screenshot.cutie}/${screenshot.screenshot}`)
        .setTimestamp()
        .setFooter({ text: 'There you go cutie ❤' });

    await interaction.reply({ embeds: [popupEmbed] });
}