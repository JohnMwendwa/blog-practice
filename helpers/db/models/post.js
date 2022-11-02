import mongoose from "mongoose";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const { Schema } = mongoose;
const window = new JSDOM("").window;
const purify = DOMPurify.addHook(window);

const postSchema = new Schema({
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
  nLikes: Number,
  nComments: Number,
});

postSchema.pre("validate", async function (next) {
  const post = this;
  if (post.markdown) {
    post.markdown = purify.sanitize(marked.parse(post.markdown));
  }
  next();
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
