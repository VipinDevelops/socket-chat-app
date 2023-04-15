import express from 'express';
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`listening on port ${port}!`));