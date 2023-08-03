import clientPromise from "@/lib/mongodb";

const getDoctors = async (db, res, form) => {
  const doctors = await db
    .collection("Users")
    .find({
      $and: [
        { status: "doctor" },
        {
          $or: [
            { name: form.doctor },
            { username: form.doctor },
            { hospital: form.hospital },
            { city: form.city },
          ],
        },
      ],
    })
    .toArray();

  res.status(200).json(doctors);
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Doctorin");

  if (req.method === "POST") {
    const form = await req.body;

    getDoctors(db, res, form);
  }
}
