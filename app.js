const express = require('express');
const bodyParser = require('body-parser');

const app = express();

var today = new Date();

app.get("/", function(req, res){
    // res.send("hello");

    //note that this system of sending file only works for simple solutions.
    //however if there are hundreds with similar content, use EJS: embedded javascript Templating
    if (today.getDay() === 6 || today.getDay() === 0){
        // res.send("It's the weekend!");
        res.sendFile(__dirname + "/weekend.html");
    } else{
        // res.send("Boohoo, It's a workday.");
        res.sendFile(__dirname + "/weekday.html");
    };
    
});

app.listen(3000, function(){
    console.log("Server listening on 3000");
});