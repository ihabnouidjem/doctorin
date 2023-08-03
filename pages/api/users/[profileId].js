import clientPromise from "@/lib/mongodb";

const postProfile = async (db, res, newItems, profileId) => {
  const updateProfile = await db.collection("Users").updateOne(
    { id: `${profileId}` },
    {
      $set: newItems,
      $currentDate: { lastUpdated: true },
    }
  );
  const updatedProfile = await db
    .collection("Users")
    .findOne({ id: profileId });
  res.status(200).json(updatedProfile);
};

const getProfile = async (db, res, profileId) => {
  const profile = await db.collection("Users").findOne({ id: profileId });
  res.status(200).json(profile);
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Doctorin");

  const newItems = await req.body;
  const { profileId } = await req.query;

  if (req.method === "POST") {
    postProfile(db, res, newItems, profileId);
  }

  if (req.method === "GET") {
    getProfile(db, res, profileId);
  }
}
