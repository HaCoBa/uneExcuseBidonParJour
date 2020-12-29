require('dotenv').config();
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

client.post('statuses/update', {status: 'I Still Love Twitter'},  function(error, tweet, response) {
    console.log(tweet);  // Tweet body.
    console.log(response);  // Raw response object.
  });