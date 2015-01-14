# mozmeasure
Tests URL classification algorithms

##Requires:
* node.js to be installed
* a corpus of URLs

##To run:
* > node runTests.js

##To add a new algorithm:
* create a new js file in /algorithms
* this must contain a setup() and classify() function
* the setup file will be run before all testing is done
* the classify function must accept a url and optional title, and return an array of strings

 
