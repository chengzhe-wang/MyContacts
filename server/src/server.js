//Mongo
require('dotenv').config();

const {MongoClient, ServerApiVersion} = require('mongodb');
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

let db;

async function startMongo() {
    
    try {
        console.log("Connexion à MongoDB...");
        await client.connect();

        mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Mongoose connecté'))
        .catch(err => console.error('Erreur MongoDB :', err));

        // sample issu du site mongodb
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        db = client.db("myContacts");
        return db;
     
    } catch (e) {
        console.error(e);
    }

    // finally {
    //     await client.close();
    // }
}

module.exports = { startMongo };
