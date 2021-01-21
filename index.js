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
clientDB.connect(function(err) {
    if(err) {
        throw err;
    }
    // else {
    //     console.log('Connected to databe excusebidon!');
    // }
});

// Scheduled task to generate 1 tweet per day
// cron.schedule('* * * * *', function() {
//     console.log('exécuter une tâche toutes les 5 secondes');

    // I set up an init function that  I parameter as async
    // This way, I can use await properties for various function that need a response from a databese query
    const init = async () => {

    
        const getRandomId = (min, max) => {
            return Math.floor(Math.random() * (max-min)+min);
        };
    
        const getRandomTerm = async (table, min, max) => {
    
            const randomId = getRandomId(min, max);
      
            const queryResponse = await clientDB.query(`SELECT * FROM ${table}`);
            
            return queryResponse.rows[randomId].name;
    
            // console.log("response", response);
        };
    
        let new_tweet = '';

        const buildNewTweet = async () => {
            let subject = await getRandomTerm('subject', 1, 112);
            let verb = await getRandomTerm('verb', 1, 112);
            let complement = await getRandomTerm('complement', 1, 112);
            return subject + ' ' + verb + ' ' + complement + '... #ExcuseBidon #CadavreExquis';
        }
    
        new_tweet = await buildNewTweet();
        console.log(new_tweet);
      
        // ! Je récupère les archives
        let queryResponse = await clientDB.query(`SELECT * FROM archive`);
        let archives = queryResponse.rows;
        // console.log(archives);
        
        // ! La requête push fonctionne ici
        let databaseUpdate = await clientDB.query(`INSERT INTO archive VALUES ('test')`);
        queryResponse = await clientDB.query(`SELECT * FROM archive`);
        archives = queryResponse.rows;
        console.log(archives);

        // ! A finir : tester si chaque tweet est unique et agit en conséquence
        archives.map(entrie => {
            if(entrie.phrase !== new_tweet) {
                console.log('le texte est différent');
            } else {
                console.log('le texte est identique');

            }
        })
    
        // To create that will post, I need to authenticate via
        // the twitter library by using connexion informations
        // set and found in the developer tools dashboard
        const client = new Twitter({
            consumer_key: process.env.API_KEY,
            consumer_secret: process.env.API_SECRET_KEY,
            access_token_key: process.env.ACCESS_TOKEN_KEY,
            access_token_secret: process.env.ACCESS_TOKEN_SECRET,
        });
    
        // // I post the tweet
        // client.post('statuses/update', {status: new_tweet},  function(error, tweet, response) {
        //     console.log(error);  // Error body.
        //     // console.log(tweet);  // Tweet body.
        //     // console.log(response);  // Raw response object.
        // });
    
    }
    
    init();

// });

app.listen(3000);