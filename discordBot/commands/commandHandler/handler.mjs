import { client } from '../../main.mjs';

import path from 'path';

const commands = [];

// // Ping Command
// const { default: ping } = await import('../commands/ping/ping.mjs');
// commands.push({ name: ping.name, description: ping.description, execute: ping.execute });

// // Popup Command
// const { default: popup } = await import('../commands/popup/popup.mjs');
// commands.push({ name: popup.name, description: popup.description, execute: popup.execute });

// // Screenshot Command
// const { default: screenshot } = await import('../commands/screenshot/screenshot.mjs');
// commands.push({ name: screenshot.name, description: screenshot.description, execute: screenshot.execute });

export function importCommands() {
    
    const commandsFolders = path.join('..');
    commandsFolders.forEach(async folder => {
        if(folder.includes("commandHandler")) return;
        const { default: command } = await import(`../commands/${folder}/${folder}.mjs`);
        commands.push({ name: command.name, description: command.description, execute: command.execute });
    });

}

export async function registerCommands() {
    try {
        await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT), {body: commands});
        console.log("Successfully registered application commands.");
    } catch (error) {
        console.error(error);
    }
}

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if(!commands.find(command => command.name === commandName)) return;

    try {
        const command = commands.find(command => command.name === commandName);
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});