import mongoose from "mongoose";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import slugify from "slugify";

const { Schema } = mongoose;
const window = new JSDOM("").window;
const purify = DOMPurify(window);

const postSchema = new Schema(
  {
    image: {
      type: Buffer,
      required: [true, "You must upload an image for your article"],
    },
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
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    imgSrc: {
      type: String,
      required: true,
      unique: true,
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
  foreignField: "postId",
});

postSchema.pre("validate", async function (next) {
  const post = this;
  post.title = purify.sanitize(post.title);
  post.description = purify.sanitize(post.description);
  post.imgSrc = `/api/posts/${post._id}/image/`;

  if (post.title) {
    post.slug = slugify(post.title, { lower: true, strict: true });
  }
  next();
});

postSchema.pre("remove", async function (next) {
  const post = this;
  const Comment = mongoose.model("Comment");

  await Comment.deleteMany({ postId: post._id });

  next();
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
