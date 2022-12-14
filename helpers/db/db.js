import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.mongo_url);

    console.log("Connected to db  successfully");
  } catch (error) {
    console.log(error);
  }
};

export const closeConnection = async () => {
  try {
    await mongoose.disconnect(process.env.local_db);

    console.log("Closed connection successfully");
  } catch (error) {
    console.log(error);
  }
};
