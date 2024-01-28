import clientPromise from "library/mongodb";

export const connectToDatabase = async (database, collection) => {
  return (await clientPromise).db(database).collection(collection);
};
