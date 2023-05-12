const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const date = require(__dirname + "/date.js"); //require the [local] module

//this is when module.exports = getDate. However it is now module.exports.getDate
// console.log(date);  //will show that it's storing a function called getDate
// console.log(date()); //will call/use the function getDate. 


app.set('view engine','ejs');   //use EJS: embedded javascript Templating
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// var today = new Date();
// var day = "";
// var currentDay = today.getDay();
var items = ["Buy Food", "Cook Food", "Eat Food"];
var workItems = []
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


// code for date logic has been moved to date.js
// using node.js, 
    let jsDay = date.getDate();
    // let jsDay = date.getDay();       //we have multiple functions stored here
    res.render("list", {dayType: jsDay, newListItems: items});
    
});

app.post("/", function(req, res){
    let item = req.body.newItem;
    console.log(req.body.list);
    if (req.body.list === "Work List"){
        workItems.push(item);
        res.redirect("/work");
    } else{
        // console.log(item);
        items.push(item);
        res.redirect("/");
    };
    

});

app.get("/work", function(req, res){
    res.render("list", {dayType: "Work List", newListItems: workItems});
})

app.get("/about", function(req, res){
    res.render("about");
})


// app.post does not get called as we are using the same template for the home and work section
// app.post("/work", function(req, res){
//     var workItem = req.body.newItem;
//     // console.log(item);
//     workItems.push(workItem)
//     res.redirect("/work");
// });
app.listen(3000, function(){
    console.log("Server listening on 3000");
});