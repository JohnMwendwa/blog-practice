import mongoose from "mongoose";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const { Schema } = mongoose;
const window = new JSDOM("").window;
const purify = DOMPurify(window);

const commentSchema = new Schema(
  {
    body: {
      type: String,
      trim: true,
      required: [true, "You can't create an empty comment"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    parentId: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "date_uploaded",
      updatedAt: "date_modified",
    },
  }
);

commentSchema.pre("validate", function (next) {
  this.body = purify.sanitize(this.body);
  next();
});

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
