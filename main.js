var request = require('request');
var spotify = require('node-spotify-api');
var fs = require("fs");
var twitter = require('./key.js');
var args = process.argv;
var func = args[2];
var input = args[3];

var Spotify = new spotify({
	id: "53be348cc9cc43dfbc98323ba6ae31c5",
	secret: "c1a2da5a911f48f3babc80c6f81e66c4"
});

function twitterTimeline(){
	
	// var params = {screen_name: 'UNC_TED',count:10} // if to specify others but if self it may not be needed
	var params ={count:10} 
	twitter.get('statuses/user_timeline',params, function(error, tweets, response) {
		if(error) throw error;
		for(var i=0;i<tweets.length;i++){
	  	console.log('Tweets:',tweets[i].text);  // The posts 
	  	var temp = tweets[i].created_at.slice(0,19);
	  	console.log('Created At',temp,'at Pacific Time (US & Canada)')
	  	console.log('******************************');
	  }
	  
	  // console.log(response);  // Raw response object. 
	})
}

function spotifyReply(){
	if(args.length>4){
		var temp = args.slice(3);
		input = temp.join(' ');
	}
	if (input === undefined) {
		input = "The Sign by Ace of Base";
	};

	Spotify.search({
		type: "track", query: input
	}, function(err, data) {
		if (err) throw err;
		data.tracks.items[0].artists[0].name?console.log('Artist:',data.tracks.items[0].artists[0].name):console.log('No Artist Info');
		data.tracks.items[0].name?console.log('Track Name:',data.tracks.items[0].name):console.log('No Track Info');
		data.tracks.items[0].preview_url?console.log('Preview:',data.tracks.items[0].preview_url):console.log('No Preview Info');		
		data.tracks.items[0].album.name?console.log('Album Name:',data.tracks.items[0].album.name):console.log('No Track Info');
		console.log('******************************');
	});


}

function omdbMovie(){
	if(args.length>4){
		var temp = args.slice(3);
		input = temp.join(' ');
	}
	var url = "http://www.omdbapi.com/?apikey=40e9cece&t=" + input;
	request(url, function(err,data,body) {
		var mov = JSON.parse(body);
		mov.Title?console.log("Title:", mov.Title):'';
		mov.Year?console.log("Year:", mov.Year):'';
		mov.IMDB?console.log("IMDB Rating:", mov.IMDB):'';
		mov.Rotten?console.log("Rotten Tomatoes Rating:", mov.Rotten):'';
		mov.Country?console.log("Country:", mov.Country):'';
		mov.Language?console.log("Language:", mov.Language):'';
		mov.Plot?console.log("Plot:", mov.Plot):'';
		mov.Actors?console.log("Actors:", mov.Actors):'';
		console.log('******************************');
	});
}

function doWhat(){
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) throw error;
		var arr = data.split(",");
		// console.log(arr);
		func = arr[0];
		input = arr[1];
		whatToDo();
	});
}

function whatToDo(){
	if (func == "my-tweets") {
		twitterTimeline();
	} else if
	(func == "spotify-this-song") {
		spotifyReply();
	} else if 
	(func == "movie-this") {
		omdbMovie();
	} else if 
	(func == "do-what-it-says") {
		doWhat();
	}
}
whatToDo();