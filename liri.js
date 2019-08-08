require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
const axios = require("axios");
const Movie = process.env.omdb;
const moment = require("moment")
const fs = require("fs")



const argv = process.argv[2];
const userInput = process.argv.slice(3).join(" ")


function liri(){
  if (argv === "spotify-this-song"){
    console.log(userInput);
    spotifySong(userInput);
  }
  else if (argv === "movie-this") {
    console.log(userInput);
    movieSearch(userInput);
  }
  else if (argv === "concert-this"){
    console.log(userInput);
    bandSearch(userInput);
  }
  else if (argv === "do-what-it-says"){
    console.log(userInput);
    readTxt(userInput);
  }
}
liri();

function readTxt(){
  fs.readFile("random.txt", "utf8" ,(err,data)=>{
    let txt = data.split(",");
    spotifySong(txt[1]);
  })
}

function bandSearch(artist){
  if (!artist){
    artist = "Maroon 5"
  } 
    
  let queryUrl2 = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=999"

  axios.get(queryUrl2)
  .then ((result2)=> {
    console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
    console.log("Band Result");
    console.log("________________________________________________________________");
    console.log("Artist: " + artist);
    console.log("________________________________________________________________");
    console.log("Venue Name: " + result2.data[0].venue.name);
    console.log("________________________________________________________________");
    console.log("Venue Location: " + result2.data[0].venue.city + ", " + result2.data[0].venue.region + ", " + result2.data[0].venue.country);
    console.log("________________________________________________________________");
    console.log("Date of Event: " +  moment(result2.datetime).format("MM/DD/YYYY"));
  })
}

function movieSearch(movie){
  if (!movie){
    movie = "Interstellar"
  }
  
  let queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=" + Movie
  axios.get(queryUrl)
  .then((result)=>{
      console.log("////////////////////////////////////////////////////////////////");
      console.log("Movie Result");
      console.log("-----------------------------------------------------------------");
      console.log("Movie Title: " + result.data.Title);
      console.log("-----------------------------------------------------------------");
      console.log("Release Year: " + result.data.Year);
      console.log("-----------------------------------------------------------------");
      console.log("IMDB Rating: " + result.data.imdbRating);
      console.log("-----------------------------------------------------------------");
      console.log("Rotten Tomatoes Rating: " + result.data.Ratings[1].Value);
      console.log("-----------------------------------------------------------------");
      console.log("Country Produced In: " + result.data.Country);
      console.log("-----------------------------------------------------------------");
      console.log("Language: " + result.data.Language);
      console.log("-----------------------------------------------------------------");
      console.log("Movie Plot: " + result.data.Plot);
      console.log("-----------------------------------------------------------------");
      console.log("Actors and Actresses: " + result.data.Actors);
  }) 
}

function spotifySong (song){
  if (!song){
    song = "Hooked on a Feeling"
  } 

  spotify.search({ type: 'track', query: song , limit: "1" })
  .then((data)=> {
    // console.log(data);
    console.log("////////////////////////////////////////////////////////////////");
    console.log("Search Result");
    console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
    console.log("Song Name: " + data.tracks.items[0].name);
    console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
    console.log("Song Link: " + data.tracks.items[0].preview_url);
    console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
    console.log("Album: " + data.tracks.items[0].album.name);
  })
  .catch((err)=> {
    console.log(err);
  });
}





