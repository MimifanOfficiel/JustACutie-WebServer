import path from 'path';
import fs from 'fs';
import { Events, Routes } from 'discord.js';
// import { rest } from '../../main.mjs';


// export function importCommands() {
//     let commands = [];
//     return new Promise((resolve, reject) => {
//         const commandsFolders = fs.readdirSync(path.join('discordBot', 'commands'));
//         commandsFolders.forEach(async folder => {
//             if(folder.startsWith("commandHandler")) return;
//             console.log(folder);
//             const { default: command } = await import(`../${folder}/${folder}.mjs`);
//             commands.push({ name: command.name, description: command.description, execute: command.execute });
//         });
//         resolve(commands);
//     });
   
// }


// export async function registerCommands(commands) {
//     console.log("Registering application commands.", commands);
//     try {
//         await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT), {body: commands});
//         console.log("Successfully registered application commands.");
//     } catch (error) {
//         console.error(error);
//     }
// }



export function handleCommand(client) {

    // client.on(Events.InteractionCreate, async interaction => {
    //     if (!interaction.isChatInputCommand()) return;
    
    //     const { commandName } = interaction;
    
    //     if(!commands.find(command => command.name === commandName)) return;
    
    //     try {
    //         const command = commands.find(command => command.name === commandName);
    //         await command.execute(interaction);
    //     } catch (error) {
    //         console.error(error);
    //         await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    //     }
    // });

}
