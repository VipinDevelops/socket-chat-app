const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('home');
    }
);

app.post('/submit',(req,res)=>{
    const { username, roomid } = req.body;
    // log the form data to the console
    if(username == "" || roomid == ""){
        console.log("Please enter a valid username and room id");
        return;
    }
    console.log(`Username: ${username} and Room ID: ${roomid}`);
})

let port = 5000;
const server = app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});


