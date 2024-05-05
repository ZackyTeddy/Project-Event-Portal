import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI || "";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("portal").command({ ping: 1 });
    console.log("[DB] SUCCESSFUL CONNECTION TO ATLAS ");
} catch(err) {
    console.error(err);
}

let db = client.db("portal");

export default db;