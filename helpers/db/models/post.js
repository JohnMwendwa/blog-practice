import mongoose from "mongoose";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const { Schema } = mongoose;
const window = new JSDOM("").window;
const purify = DOMPurify(window);

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Your article must have a title"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Your article must have a desription"],
      trim: true,
    },
    markdown: {
      type: String,
      required: [true, "Your article body can't be empty"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Author is required"],
      ref: "User",
    },
    category: {
      type: String,
      required: [true, "Please add article category"],
    },
    nLikes: {
      type: Number,
      default: 0,
    },
    nComments: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: "date_uploaded",
      updatedAt: "date_modified",
    },
  }
);

postSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
});

postSchema.pre("validate", async function (next) {
  const post = this;
  post.title = purify.sanitize(post.title);
  post.description = purify.sanitize(post.title);
  post.markdown = purify.sanitize(post.markdown);
  next();
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
