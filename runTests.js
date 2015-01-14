//Main handler file for running tests

var connect = require('connect'); 
var serveStatic = require('serve-static'); 
var open = require('open'); //can open up a browser window

//set up basic web server
var app = connect();
app.use(serveStatic(__dirname + "/results_interface", {'index': ['index.html']})); //redirects for a default
app.listen(8080);

//open up the user's browser window
open('http://localhost:8080');