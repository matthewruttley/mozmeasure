//Main handler file for running tests

var fs = require('fs'); //file io
var connect = require('connect'); 
var serveStatic = require('serve-static'); 
var open = require('open'); //can open up a browser window
var mongo_moreover = require("./database_connectivity/mongo_moreover.js")

//Grab some data
var data = mongo_moreover.load_moreover_data();

//Load all the classification algorithms
var algorithms = []
var normalizedPath = require("path").join(__dirname, "algorithms");
fs.readdirSync(normalizedPath).forEach(function(file) {
  
  filename = file.split(".")[0] //remove the file extension
  algorithms.push(require("./algorithms/" + file)) //load the file
  
  //give it a name
  algorithms[algorithms.length-1]['name'] = filename
  
  //run the setup function in it
  //which returns data to be accessed later
  algorithms[algorithms.length-1].model = algorithms[algorithms.length-1].setup()
  
  //create a results object
  algorithms[algorithms.length-1].results = {
	correct: 0,
	incorrect: 0,
	uncategorized: 0,
	precision: 0,
	recall: 0,
	f1: 0
  }
  
});

//Test them out
for (var urlIndex in data) {
	for (var algorithmIndex in algorithms) {
		//classify the url
		classification = algorithms[algorithmIndex].classify(data[urlIndex].url, data[urlIndex].title, algorithms[algorithmIndex].model)
		//save the results
		if (classification[0] == 'uncategorized') algorithms[algorithmIndex]['uncategorized'] += 1
		if (classification[0] == data.expectedResult){
			algorithms[algorithmIndex]['correct'] += 1
		}else{
			algorithms[algorithmIndex]['incorrect'] += 1
		}
	}
}

//Calculate precision, recall and f1
var results = {}
for (var algorithmIndex in algorithms) {
	name = algorithms[algorithmIndex].name
	algorithms[algorithmIndex]['results']['precision'] = algorithms[algorithmIndex]['correct'] / algorithms[algorithmIndex]['incorrect']
	algorithms[algorithmIndex]['results']['recall'] = (algorithms[algorithmIndex]['correct'] + algorithms[algorithmIndex]['incorrect']) / data.length
	algorithms[algorithmIndex]['results']['f1'] = algorithms[algorithmIndex]['precision'] * algorithms[algorithmIndex]['recall']
	results[name] = algorithms[algorithmIndex].results //save to a new results object
}

//Save the results to a JSON file
results = JSON.stringify(results, null, 4) //format nicely
var timestamp = 0  //TODO
var outputFilename = '/results/' + timestamp + '.json';
//fs.writeFile(outputFilename, results, function(err) {
//    if(err) {
//      console.log(err);
//    } else {
//      console.log("JSON saved to " + outputFilename);
//    }
//}); 


////set up basic web server
//var app = connect();
//app.use(serveStatic(__dirname + "/results_interface", {'index': ['index.html']})); //redirects for a default
//app.listen(8080);
//
////open up the user's browser window to display the results
//open('http://localhost:8080');