// console.log(module);
// module.exports = getDate; //note that no brackets here because that would call the function at the start

// in order to export multiple, can export it as attributes
// module.exports.getDate = getDate;


// changing the getDate function to an anonymous function that saves into a variable [the variable can be passed around]
// function getDate(){

// var getDate = function(){
// going one step further, instead of writing module.exports.getDate = getDate

// also instead of typing module.exports, can just type exports
module.exports.getDate = function(){
    var today = new Date();
    
    //instead of using this manual case statement, look up libraries for something easier
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var jsDay = today.toLocaleDateString("en-US", options);

    return jsDay;
}

// making the function an anonymous function
// module.exports.getDay = getDay;
// function getDay(){
module.exports.getDay = function(){
    var today = new Date();
    
    //instead of using this manual case statement, look up libraries for something easier
    var options = {
        weekday: "long",
    };
    var jsDay = today.toLocaleDateString("en-US", options);

    return jsDay;
}

// switch (currentDay){
//     case 0:
//         day = "Sunday";
//         break;
//     case 1:
//         day = "Monday";
//         break;
//     case 2:
//         day = "Tuesday";
//         break;
//     case 3:
//         day = "Wednesday";
//         break;
//     case 4:
//         day = "Thursday";
//         break;
//     case 5:
//         day = "Friday";
//         break;
//     case 6:
//         day = "Saturday";
//         break;
//     default:
//         day = "Break";
//         break;
// }