//Connects to moreover data on morngodb
//Moreover data is a series of pre classified urls


function load_moreover_data(){
	console.log('Loading moreover data...')
	
	urldata = [
		{
			title: "Google Search",
			url: "http://www.google.com"
		}
	]
	
	return urldata
}



exports.load_moreover_data = load_moreover_data;