import mongoose from "mongoose";
const { Schema } = mongoose;

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

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
