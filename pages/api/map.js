import clientPromise from "@/lib/mongodb";

const getMap = async (db, res) => {
  const map = await db.collection("Map").find({}).toArray();
  res.status(200).json(map);
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Doctorin");

  if (req.method === "GET") {
    getMap(db, res);
  }
}
