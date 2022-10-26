import mongoose from "mongoose";

export const connectToDatabase = () => {
  try {
    mongoose.connect(process.env.local_db);

    console.log("Connected to db  successfully");
  } catch (error) {
    console.log(error);
  }
};

export const closeConnection = () => {
  try {
    mongoose.disconnect(process.env.local_db);

    console.log("Closed connection successfully");
  } catch (error) {
    console.log(error);
  }
};
