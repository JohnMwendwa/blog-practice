import mongoose from "mongoose";
mongoose.set("strictQuery", true);

const MONGO_URL =
  process.env.NODE_ENV !== "production"
    ? process.env.local_db
    : process.env.mongo_url;

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URL);

    console.log("Connected to db  successfully");
  } catch (error) {
    console.log(error);
  }
};

export const closeConnection = async () => {
  try {
    await mongoose.disconnect(MONGO_URL);

    console.log("Closed connection successfully");
  } catch (error) {
    console.log(error);
  }
};
