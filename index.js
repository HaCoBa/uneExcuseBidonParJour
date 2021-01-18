// ENV variables
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;

// Express server
const express = require('express');

const app = express();

// Twitter part
const Twitter = require('twitter');

const client = new Twitter({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const new_tweet = '';

// client.post('statuses/update', {status: new_tweet},  function(error, tweet, response) {
//     console.log(tweet);  // Tweet body.
//     console.log(response);  // Raw response object.
//   });

// Launching server
app.listen( PORT, () => {
    console.log(`Transplanage vers http://localhost:${PORT}`);
})