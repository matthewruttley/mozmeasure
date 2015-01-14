//Main handler file for running tests

var connect = require('connect'); 
var serveStatic = require('serve-static'); 
var open = require('open'); //can open up a browser window
var mongo_moreover = require("./database_connectivity/mongo_moreover.js")

//Grab some data
var data = mongo_moreover.load_moreover_data();


//Load all the classification algorithms
var algorithms = {}
var normalizedPath = require("path").join(__dirname, "algorithms");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  filename = file.split(".")[0] //remove the file extension
  algorithms[filename] = require("./algorithms/" + file); //load the file
  //run the setup function in it
  algorithms[filename].setup()
});




//Test them out


//Save the test results


//Send them to the interface


////set up basic web server
//var app = connect();
//app.use(serveStatic(__dirname + "/results_interface", {'index': ['index.html']})); //redirects for a default
//app.listen(8080);
//
////open up the user's browser window
//open('http://localhost:8080');