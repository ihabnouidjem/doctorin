import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const postChat = async (db, res, chatId, newChat) => {
  const chat = await db.collection("Chat").updateOne(
    { _id: ObjectId(chatId) },
    {
      $set: newChat,
      $currentDate: { lastUpdated: true },
    }
  );
  const myChat = await db.collection("Chat").findOne({ _id: ObjectId(chatId) });

  res.status(200).json(myChat);
};

const getChat = async (db, res, chatId) => {
  const myChat = await db.collection("Chat").findOne({ _id: ObjectId(chatId) });

  res.status(200).json(myChat);
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Doctorin");

  const newChat = await req.body;
  const { chatId } = req.query;

  if (req.method === "POST") {
    postChat(db, res, chatId, newChat);
  }

  if (req.method === "GET") {
    getChat(db, res, chatId);
  }
}
