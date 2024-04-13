const data = {
    name: 'ping',
    description: 'Replies with Pong!',
    execute: execute
};
export default data;

export async function execute(interaction) {
    await interaction.reply('Pong 🏓!');
}


