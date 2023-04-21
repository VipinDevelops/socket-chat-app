const express = require('express');
const { Server } = require('socket.io');
const {createServer} = require('http');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
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
        return;
    }

    res.redirect(`/chat?username=${username}&roomid=${roomId}`);
})

app.get('/chat', (req, res) => {
    const { username, roomid } = req.query;
    res.render('chat', { username, roomid });
});


io.on('connection', (socket) => {
    socket.on('join-room', (roomid, username) => {
        //join socket to room
        socket.join(roomid);
        // send user connected message to room
        io.to(roomid).emit('user-connected', username);
    });

    socket.on('exit-room', (roomid,username) => {   
        // socket.leave(roomid);     
        socket.leave(roomid);
        io.to(roomid).emit('user-disconnected', username);

    });

    socket.on('message', (name, message, roomid) => {
        io.to(roomid).emit('receive-message', name, message);
    });

});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT,()=>{
    console.log(`App running on http://localhost:${PORT}/`);
});




