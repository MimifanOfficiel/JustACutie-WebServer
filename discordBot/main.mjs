import Discord from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

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
    console.log("Hai ?")
    guild = client.guilds.fetch("1228013193092141096");
    console.log(guild);
    // guild = await client.guilds.fetch("1228013193092141096").then(guild => {
    //     const channel = guild.channels.cache.get('1228013193708961935');
    //     channel.send("Haiii, I'm online to assist Mommy :3");
    //     return guild;
    // });

});

