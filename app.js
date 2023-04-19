const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('index');
    }
);

app.post('/submit',(req,res)=>{
    // log the form data to the console
    console.log(req.body);

    if(req.body.username === "" || req.body.roomid === ""){
        console.log("Please enter a username and room id");
    }

})

let port = 7000;
const server = app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});


