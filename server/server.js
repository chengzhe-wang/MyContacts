//Server
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./src/routes/userRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");


const app = express();
app.use(bodyParser.json());


app.use("/", userRoutes);

app.listen(3000, () => 
  console.log("Server running on http://localhost:3000")
);


const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MyContacts API",
      version: "1.0.0",
      description: "Documentation de l'API MyContacts avec Express + MongoDB",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
        await client.connect();

        mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Mongoose connecté'))
        .catch(err => console.error('Erreur MongoDB :', err));

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

startMongo().catch(console.error);
