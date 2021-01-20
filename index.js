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

// TODO : CODE A CRON TASK
// cron.schedule('10 * * * * *', function() {
//     console.log('exécuter une tâche à chaque minute');

    // Get a random if between an interval
    function getRandomInDBTable(min, max) {
        return Math.floor(Math.random()*(max-min)+min);
    }

    // Get a random string from a specified table
    function getRandomString(table) {

        clientDB.query(`SELECT COUNT (*) from ${table}`, (err, res) => {

            if(err) {

                console.log(err);

            } else {

                result = parseInt(res.rows[0].count);
                // console.log('table length', result);
                // console.log(typeof result);
                let randomStringId = getRandomInDBTable(1, result);
                // console.log('random string id', randomStringId);

                clientDB.query(`SELECT * from ${table} WHERE id=${randomStringId}`, (err, res) => {

                    if(err) {

                        console.log(err);

                    } else {

                        result = res.rows[0].name;
                        // console.log(result);
                        return result; // Ici j'ai bien le terme que je veux
                    }
                })
            }
        });
    }

    let subject = getRandomString('table'); // mais ici, c'est toujours undefined
    console.log(subject);

    // let subjectId = getRandomInDBTable(1, getTableLength());
    // console.log(subjectId);

    // let subject='';
    // let verb='';
    // let complement='';
    // let new_tweet = '';

    // clientDB.query('SELECT * FROM "subject" WHERE id=1', (err, res)=> {
    //     if(err) {
    //         console.log(err);
    //     } else {
    //         subject = res.rows[0].name;
    //         console.log(subject);
    //         new_tweet += subject + ' ';
    //         console.log('new tweet =', new_tweet);

    //     }
    // });

    // clientDB.query('SELECT * FROM "verb" WHERE id=1', (err, res)=> {
    //     if(err) {
    //         console.log(err);
    //     } else {
    //         verb = res.rows[0].name;
    //         console.log(subject);
    //         new_tweet += verb + ' ';
    //         console.log('new tweet =', new_tweet);

    //     }
    // });

    // clientDB.query('SELECT * FROM "complement" WHERE id=1', (err, res)=> {
    //     if(err) {
    //         console.log(err);
    //     } else {
    //         complement = res.rows[0].name;
    //         console.log(subject);
    //         new_tweet += complement + '... #ExcuseBidon';
    //         console.log('new tweet =', new_tweet);

    //     }
    // });

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