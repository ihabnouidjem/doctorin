import clientPromise from "@/lib/mongodb";

const getProfile = async (db, res, user) => {
  const profile = await db.collection("Users").findOne({ id: user.id });
  if (profile) {
    res.status(200).json(profile);
  } else {
    const newUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      status: "new",
    };
    const newProfile = await db.collection("Users").insertOne(newUser);

    const getNewProfile = await db.collection("Users").findOne({ id: user.id });
    res.status(200).json(getNewProfile);
  }
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Doctorin");

  const user = await req.body;

  if (req.method === "POST") {
    getProfile(db, res, user);
  }
}
