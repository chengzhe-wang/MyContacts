const {MongoClient, ServerApiVersion} = require('mongodb');

const uri = "mongodb+srv://chengzhewang_db_user:ctVP0t7CWEpbC7vm@mycontacts.52pvxwi.mongodb.net/?retryWrites=true&w=majority&appName=MyContacts";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

async function main() {
    
    try {
        await client.connect();

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
        await listDatabases(client);
     
    } catch (e) {
        console.error(e);
    }

    finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
 