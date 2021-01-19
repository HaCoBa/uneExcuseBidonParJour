// I call dotenv to set an .env file for API key and access token
const dotenv = require('dotenv');
// I call the config saved in my .env file
dotenv.config();

// I call the twitter library installed
var Twitter = require('twitter');

// To create that will post, I need to authenticate via
// the twitter library by using connexion informations
// set and found in the developer tools dashboard
var client = new Twitter({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

// I set a variable where I will stocked the content of each new tweet
const new_tweet = 'Salut Marianne, ça gaze ?';

// 
client.post('statuses/update', {status: new_tweet},  function(error, tweet, response) {
    console.log(error);  // Error body.
    console.log(tweet);  // Tweet body.
    console.log(response);  // Raw response object.
});