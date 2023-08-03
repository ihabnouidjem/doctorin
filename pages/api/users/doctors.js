import clientPromise from "@/lib/mongodb";

const getDoctors = async (db, res) => {
  const doctors = await db
    .collection("Users")
    .find({ status: "doctor" })
    .toArray();

  res.status(200).json(doctors);
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Doctorin");

  if (req.method === "GET") {
    getDoctors(db, res);
  }
}
