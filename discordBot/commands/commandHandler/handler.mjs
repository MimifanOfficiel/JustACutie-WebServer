import path from 'path';
import fs from 'fs';
import { Events, Routes } from 'discord.js';
import { rest } from '../../main.mjs';

var commands = [];

export function importCommands() {
    // const commandsFolders = fs.readdirSync(path.join('discordBot', 'commands'));
    // commandsFolders.forEach(folder => {
    //     if(folder.startsWith("commandHandler")) return;
    //     const commandFiles = fs.readdirSync(path.join('discordBot', 'commands', folder)).filter(file => file.endsWith('.mjs'));
    //     commandFiles.forEach( (file) => {
    //         return new Promise(async (resolve, reject) => {
    //             console.log(`Importing ${file}`)
    //             const { default: command } = await import(`../../commands/${folder}/${file}`);
    //             // commands.push(command);
    //             commands.push({ name: command.name, description: command.description, execute: command.execute });
    //         });
    //     }).then(() => {
    //         console.log("Imported commands: ", commands);
    //     });
    // });

    return new Promise((resolve, reject) => {
        const commandsFolder = fs.readdirSync(path.join('discordBot', 'commands'));
        commandsFolder.forEach(commandFolder => {
            if(commandFolder.startsWith("commandHandler")) return;
            const commandFiles = fs.readdirSync(path.join('discordBot', 'commands', commandFolder)).filter(file => file.endsWith('.mjs'));
            commandFiles.forEach(async file => {
                const { default: command } = await import(`../../commands/${commandFolder}/${file}`);
                console.log(command)
                commands.push(command);
            });
    
        });
        resolve(commands);
    });

}


export async function registerCommands() {
    console.log(commands)
    try {
        await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT), {body: commands});
        console.log("Successfully registered application commands.");
    } catch (error) {
        console.error(error);
    }
}



export function handleCommand(client) {

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

}
