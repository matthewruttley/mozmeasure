# mozmeasure
Tests URL classification algorithms

###Installation
* move to an empty directory and: git clone https://github.com/matthewruttley/mozmeasure.git
* (make sure node.js is installed, google it if not)
* > npm install connect serve-static open

###To run:
* > node runTests.js

###Requires:
* a corpus of URLs, we are using data from moreover

###To add a new algorithm:
* create a new js file in /algorithms
* this must contain a setup() and classify() function
* the setup file will be run before all testing is done
* the classify function must accept a url and optional title, and return an array of strings

 
