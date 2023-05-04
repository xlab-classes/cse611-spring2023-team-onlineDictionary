const router = require('express').Router();
var request = require('request');
const axios = require('axios');

const { MongoClient, ServerApiVersion } = require("mongodb");
// Replace the placeholder with your Atlas connection string
const uri = "mongodb://localhost:27017/";
// const uri = "mongodb://application-37.10xw8i3rxjwe.us-east.codeengine.appdomain.cloud:443/";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

router.get('/testmongo', (_, response) => {
    run().catch(console.dir);
})
async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        console.log('attempting to connect...')
        await client.connect();
        console.log('connected')
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // var database = client.db('test1')
        // var words = database.collection('words')
        // words.insertOne({'firstWord':'Meaning of firstWord'})


    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}


module.exports = router;