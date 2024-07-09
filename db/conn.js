
// Import the MongoClient constructor from the mongodb library
import { MongoClient, ServerApiVersion } from "mongodb";


const connectionString = process.env.ATLAS_URI || "mongodb+srv://tobi4u:CNJYumNErFl2JDZY@tobi4u.byvrs22.mongodb.net/?retryWrites=true&w=majority&appName=tobi4u";

// mongoose.connect(connectionString);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(connectionString, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let conn;
try {
  conn = await client.connect();
  console.log("mongo connected")
} catch (e) {
  console.error(e);
}

let db = conn.db("sample_mflix");

export default db;