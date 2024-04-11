import http from 'http';
import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const server = http.createServer(app);

app.use(express.static('/public'));


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/download', (req, res) => {
    res.download("build/YouAreJustACutie.jar");
});


server.listen(1570, () => {
    console.log(`Server running on port 1570`);
});