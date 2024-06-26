import Discord, { Events, REST, Routes } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();
export const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

// import { handleCommand } from './commands/commandHandler/handler.mjs';


export const client = new Discord.Client({
    intents: [
        Discord.IntentsBitField.Flags.Guilds,
        Discord.IntentsBitField.Flags.GuildMessages,
        Discord.IntentsBitField.Flags.GuildMembers
    ]
});

export var guild;

client.login(process.env.DISCORD_TOKEN);

client.on('ready', async () => {
    guild = await client.guilds.fetch("1228013193092141096").then(guild => {
        const channel = guild.channels.cache.get('1228013193708961935');
        // channel.send("Haiii, I'm online to assist Mommy :3");
        return guild;
    });
    
});

import { memberJoinEventHandler } from './events/memberJoin.mjs';
import { memberUpdateEventHandler } from './events/memberUpdate/memberUpdate.mjs';

client.on(Events.GuildMemberAdd, async member => { memberJoinEventHandler(member); });
client.on(Events.GuildMemberUpdate, async (oldMember, newMember) => { memberUpdateEventHandler(oldMember, newMember);});


var commands = [];

// Ping Command
const { default: ping } = await import('./commands/ping/ping.mjs');
commands.push({ name: ping.name, description: ping.description, execute: ping.execute });

// Popup Command
const { default: popup } = await import('./commands/popup/popup.mjs');
commands.push({ name: popup.name, description: popup.description, execute: popup.execute });

// Screenshot Command
const { default: screenshot } = await import('./commands/screenshot/screenshot.mjs');
commands.push({ name: screenshot.name, description: screenshot.description, execute: screenshot.execute });

// UserInfo Command
// const { default: userInfo } = await import('./commands/userInfos/userInfos.mjs');
// commands.push({ name: userInfo.name, description: userInfo.description, execute: userInfo.execute, options: userInfo.options });

try {
    await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT), {body: commands});
    console.log("Successfully registered application commands.");
} catch (error) {
    console.error(error);
}


client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if(!commands.find(command => command.name === commandName)) return;

    try {
        const command = commands.find(command => command.name === commandName);

        const userID = interaction.user.id;
        const user = await guild.members.fetch(userID);

        if(!user.roles.cache.some(role => role.name === 'Admin')) {
            if(interaction.channelId === '1228724504230891612') command.execute(interaction);
            else await interaction.reply({ content: "You don't have permission to use this command in this channel!", ephemeral: true });
            return;
        } else {
            await command.execute(interaction);
        }

    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});


// handleCommand(client);