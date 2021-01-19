require('dotenv').config();
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const new_tweet = 'I Love Twitter';

client.post('statuses/update', {status: new_tweet},  function(error, tweet, response) {
    console.log(error);  // Error body.
    // console.log(tweet);  // Tweet body.
    // console.log(response);  // Raw response object.
    });