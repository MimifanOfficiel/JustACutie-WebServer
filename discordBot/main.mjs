import Discord, { Events, REST, Routes } from 'discord.js';
import dotenv from 'dotenv';

import { registerCommands, importCommands, handleCommand } from './commands/commandHandler/handler.mjs';


dotenv.config();
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);


export const client = new Discord.Client({
    intents: [
        Discord.IntentsBitField.Flags.Guilds,
        Discord.IntentsBitField.Flags.GuildMessages,
        Discord.IntentsBitField.Flags.GuildMembers
    ]
});

import { registerCommands, importCommands } from './commands/commandHandler/handler.mjs';

export var guild;

client.login(process.env.DISCORD_TOKEN);

client.on('ready', async () => {
    guild = await client.guilds.fetch("1228013193092141096").then(guild => {
        const channel = guild.channels.cache.get('1228013193708961935');
        // channel.send("Haiii, I'm online to assist Mommy :3");
        return guild;
    });

});

importCommands();
registerCommands();
handleCommand(client);