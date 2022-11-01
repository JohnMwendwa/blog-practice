import mongoose from "mongoose";
const { Schema } = mongoose;

const replySchema = new Schema(
  {
    text: {
      type: String,
      trim: true,
      required: [true, "You can't send an empty reply"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
  },
  {
    timestamps: {
      createdAt: "date_uploaded",
      updatedAt: "date_modified",
    },
  }
);

const Reply = mongoose.models.Reply || mongoose.model("Reply", replySchema);

export default Reply;
