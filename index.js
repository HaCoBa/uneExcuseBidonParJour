// calling Express for the server
const express = require('express');
//calling node-cron for the scheduled task
const cron = require('node-cron');
// I call dotenv to set an .env file for API key and access token
const dotenv = require('dotenv');
// I call the config saved in my .env file
dotenv.config();
// I call postgre library
const { Client } = require('pg');
// I call the twitter library installed
var Twitter = require('twitter');

// Creating an instance Express
app = express();

// Creating a new "client" for the database with the env informations
const clientDB = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});
// Connecting to the database
clientDB.connect();

// cron.schedule('10 * * * * *', function() {
//     console.log('exécuter une tâche à chaque minute');

    

    // // To create that will post, I need to authenticate via
    // // the twitter library by using connexion informations
    // // set and found in the developer tools dashboard
    // const client = new Twitter({
    //     consumer_key: process.env.API_KEY,
    //     consumer_secret: process.env.API_SECRET_KEY,
    //     access_token_key: process.env.ACCESS_TOKEN_KEY,
    //     access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    // });

    // // I post the tweet
    // client.post('statuses/update', {status: new_tweet},  function(error, tweet, response) {
    //     console.log(error);  // Error body.
    //     console.log(tweet);  // Tweet body.
    //     // console.log(response);  // Raw response object.
    // });

// })

app.listen(3000);