const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
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
// var items = ["Buy Food", "Cook Food", "Eat Food"];
// var workItems = []

//replacing array system with a persisting database [ie. mongodb]
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");
//make an items schema
const itemsSchema = {
    name: String
};

//make a mongoose model
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome"
});
const item2 = new Item({
    name: "Hit + to add an item"
});
const item3 = new Item({
    name: "<-- Hit this to delete item"
});

const defaultItems = [item1, item2, item3];
//initial start to the mongodb database.
// Item.insertMany(defaultItems);       

async function getItems(){
    const Items = await Item.find({});
    return Items;
}

async function removeItems(mongo_id){
    const Items = await Item.findByIdAndRemove(mongo_id)
    return Items;
}


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

    getItems().then(function(FoundItems){
        if (FoundItems.length === 0){
            
            Item.insertMany(defaultItems);       
            res.redirect("/")
        } else{
            res.render("list", {dayType: jsDay, newListItems: FoundItems});    
        }
    });

    // // let jsDay = date.getDay();       //we have multiple functions stored here
    // res.render("list", {dayType: jsDay, newListItems: items});
    
});

app.post("/", function(req, res){
    // let item = req.body.newItem;
    //below is the old way using an array. Upgrading to mongoDB
    // console.log(req.body.list);
    // if (req.body.list === "Work List"){
    //     workItems.push(item);
    //     res.redirect("/work");
    // } else{
    //     // console.log(item);
    //     items.push(item);
    //     res.redirect("/");
    // };
    const itemName = req.body.newItem;
    const item = new Item({
        name: itemName
    })
    item.save();    // mongoose item
    res.redirect("/");
});

app.post("/delete", function(req,res){
    //using "onChange" attribute with inline javascript, can get the value of the name item checkbox
    // console.log(req.body);
    console.log("Test");
    const checkedItemId = req.body.checkbox;
    console.log(checkedItemId);
    // Item.findByIdAndDelete(checkedItemId);
    removeItems(checkedItemId).then(function(){
        res.redirect("/");
    });
    // res.redirect("/");
});

app.get("/work", function(req, res){
    res.render("list", {dayType: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
    res.render("about");
});


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