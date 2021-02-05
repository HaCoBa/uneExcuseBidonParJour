/********************************************************************************************
*********************************************************************************************
*********************************************************************************************
*****                                                                                   *****
*****                                                                                   *****
*****      Programme de Cadavre Exquis pour générer des excuses complètement bidon      *****
*****                                                                                   *****
*****                                                                                   *****
*********************************************************************************************
*********************************************************************************************
********************************************************************************************/


// Calling all the need librairies
const express = require('express');
const cron = require('node-cron');
const dotenv = require('dotenv');
dotenv.config();
const { Client } = require('pg');
var Twitter = require('twitter');


// Creating an instance Express
app = express();


// Creating a new "client" for the database with the env informations
const clientDB = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
    // user: process.env.PGUSER,
    // host: process.env.PGHOST,
    // database: process.env.PGDATABASE,
    // password: process.env.PGPASSWORD,
    // port: process.env.PGPORT,
});


// Connecting to the database
clientDB.connect(function(err) {
    if(err) {
        throw err;
    }
    else {
        console.log('Connected to database excusebidon!');
    }
});


// Scheduled task to generate 1 tweet every 6h
cron.schedule('* * * * *', function() {
    console.log('exécuter une tâche toutes les minutes');


    // I set up an init function that  I parameter as async
    // This way, I can use await properties for various function that need a response from a databese query
    const init = async () => {


        // I set up globaly all the variables I'll need
        let new_tweet = '';
        let new_status = '';

    
        /**
         * ! Function to get a random id between an interval
         * @param {number} min smallest id in the interval
         * @param {number} max biggest id in the interval
         */
        const getRandomId = (min, max) => {
            return Math.floor(Math.random() * (max-min)+min);
        };

    
        /**
         * ! Function to get a random term in each table of the database
         * @param {string} table table name from the database (subject, verb, complement)
         * @param {number} min smallest if in the interval
         * @param {number} max biggest id in the interval
         */
        const getRandomTerm = async (table, min, max) => {
    
            // I call getRandomId to generate the id
            const randomId = getRandomId(min, max);
      
            // I call the table I need and stock the result in a variable
            const queryResponse = await clientDB.query(`SELECT * FROM ${table}`);
            
            // I extract the random term found with the request and the id
            return queryResponse.rows[randomId].name;
            // ! console.log("response", response);
        };
    

        /**
         * ! Function to generate the tweet content
         * The function is async so I can call getRandomTerm and wait for the result
         * before executing each call, so I'm sure to return something
         */
        const buildNewTweet = async () => {
            let subject = await getRandomTerm('public.subject', 0, 109);
            let verb = await getRandomTerm('public.verb', 0, 109);
            let complement = await getRandomTerm('public.complement', 0, 109);
            return subject + ' ' + verb + ' ' + complement;
        }
    

        /**
         * ! Function to write the tweet content
         * I put everything return by buidNewTweet in a variables
         */
        const writeNewTweet = async () => {
            new_tweet = await buildNewTweet();
            // ! console.log(new_tweet);
        }


        /**
         * ! Function to check the duplicate
         * I check if the tweet alredy exist of not.
         * I only want unique tweets, no duplicate.
         */      
        const checkExistingTweets = async () => {

            // I wait for a filled new_tweet
            await writeNewTweet();

            // I query all the archive
            let queryResponse = await clientDB.query(`SELECT * FROM public.archive`);
            archives = queryResponse.rows;
            // ! console.log(archives);

            clientDB.query(`INSERT INTO public.archive VALUES ('${new_tweet}')`, (error, response) => {
                if(error) {
                    console.log("Cette phrase existe déjà");
                    lauchingCadavreExquis();
                } else {
                    console.log("La phrase a bien été archivée dans la base de données");
                }
            });
        }

        /**
         * ! Function that launch the Cadavre Exquis
         * This function will write the full content of the tweet
         * the text + the hashtags
         */ 
        const lauchingCadavreExquis = async () => {
            await checkExistingTweets();

            new_status = new_tweet + "... #ExcuseBidon #CadavreExquis";
        }

        // I call this function with await option so that until
        // new_status is completed the tweet won't be post
        await lauchingCadavreExquis();
    
        // To create that tweet post, I need to authenticate via
        // the twitter library by using connexion informations
        // set and found in the developer tools dashboard
        const client = new Twitter({
            consumer_key: process.env.API_KEY,
            consumer_secret: process.env.API_SECRET_KEY,
            access_token_key: process.env.ACCESS_TOKEN_KEY,
            access_token_secret: process.env.ACCESS_TOKEN_SECRET,
        });
    
        // I post the tweet
        client.post('statuses/update', {status: new_status},  function(error, tweet, response) {
            console.log(error);  // Error body.
            // console.log(tweet);  // Tweet body.
            // console.log(response);  // Raw response object.
        });
    
    }
    
    // Start the full program
    init();

});

app.listen(process.env.PORT || 3000);