const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine','ejs');   //use EJS: embedded javascript Templating
app.use(bodyParser.urlencoded({extended: true}));


var today = new Date();
var day = "";
var currentDay = today.getDay();
var items = [];
app.get("/", function(req, res){
    // res.send("hello");

    // //note that this system of sending file only works for simple solutions.
    // //however if there are hundreds with similar content, use EJS: embedded javascript Templating
    // if (today.getDay() === 6 || today.getDay() === 0){
    //     // res.send("It's the weekend!");
    //     // res.sendFile(__dirname + "/weekend.html");
    //     day = "Weekend";
        
    // } else{
    //     // res.send("Boohoo, It's a workday.");
    //     // res.sendFile(__dirname + "/weekday.html");
    //     day = today.getDay();
    // };

    switch (currentDay){
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
        default:
            day = "Break";
            break;
    }
    //instead of using this manual case statement, look up libraries for something easier
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var jsDay = today.toLocaleDateString("en-US", options);
    //ejs assumes a views directory exists, and uses .ejs files
    //accepts a keyvalue pair. dayType is in the list file
    // res.render("list", {dayType: day});
    res.render("list", {dayType: jsDay, newListItems: items});
    
});

app.post("/", function(req, res){
    var item = req.body.newItem;
    // console.log(item);
    items.push(item)
    res.redirect("/");
});
app.listen(3000, function(){
    console.log("Server listening on 3000");
});