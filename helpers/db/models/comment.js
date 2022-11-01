import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    text: {
      type: String,
      trim: true,
      required: [true, "You can't create an empty comment"],
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

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
