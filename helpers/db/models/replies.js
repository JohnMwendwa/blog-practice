import mongoose from "mongoose";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const { Schema } = mongoose;
const window = new JSDOM("").window;
const purify = DOMPurify(window);

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
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Comment",
    },
  },

  {
    timestamps: {
      createdAt: "date_uploaded",
      updatedAt: "date_modified",
    },
  }
);

replySchema.pre("validate", function (next) {
  this.email = purify.sanitize(this.email);
  this.name = purify.sanitize(this.name);
  this.text = purify.sanitize(this.text);
  next();
});

const Reply = mongoose.models.Reply || mongoose.model("Reply", replySchema);

export default Reply;
