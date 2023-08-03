import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const postChat = async (db, res, newChat) => {
  const chat = await db.collection("Chat").insertOne(newChat);
  const myChat = await db
    .collection("Chat")
    .findOne({ _id: ObjectId(chat?.insertedId) });

  res.status(200).json(myChat);
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Doctorin");

  const newChat = await req.body;

  if (req.method === "POST") {
    postChat(db, res, newChat);
  }
}
