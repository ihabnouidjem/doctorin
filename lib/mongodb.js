import { MongoClient } from "mongodb";

if (!process.env.MONGO_DB) {
  throw new Error('Invalid environment variable: "MONGO_DB"');
}

const uri = process.env.MONGO_DB;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGO_DB) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
