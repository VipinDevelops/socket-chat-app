const express = require('express');
const { Server } = require('socket.io');
const {createServer} = require('http');
const { v4: uuidv4 } = require('uuid');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer,{cors: {origin: '*'}});

const port = 4000;

// Set view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Parse URL-encoded bodies 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('home');
    }
);

app.post('/submit',(req,res)=>{
    const { username, roomid } = req.body;

    let roomId;
    if (!username == ""){
        if( roomid === ""){
            roomId = uuidv4();
        }else{
            roomId = roomid;
        }
    }
    else{
        console.log('Please enter a username')
        return;
    }

    console.log(`Username: ${username} and Room ID: ${roomId}`);
    res.redirect(`/chat?username=${username}&roomid=${roomId}`);
})

app.get('/chat', (req, res) => {
    const { username, roomid } = req.query;
    res.render('chat', { username, roomid });
    // console.log(`Username: ${username} and Room ID: ${roomid}`);
});


io.on('connection', (socket) => {
    console.log('a user connected');
});

httpServer.listen(port,()=>{
    console.log(`Server is running on port ${port}..`);
});




