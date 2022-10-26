import mongoose from "mongoose";

export const connectToDatabase = () => {
  try {
    mongoose.connect(process.env.local_db);

    console.log("Connected to db  successfully");
  } catch (error) {
    console.log(error);
  }
};
