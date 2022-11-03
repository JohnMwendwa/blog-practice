import mongoose from "mongoose";
import validator from "validator";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const { Schema } = mongoose;
const window = new JSDOM("").window;
const purify = DOMPurify(window);

const messageSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid!");
        }
      },
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      validate(value) {
        if (value.trim() === "") {
          throw new Error("You can't send a blank message");
        }
      },
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

messageSchema.pre("validate", function (next) {
  this.email = purify.sanitize(this.email);
  this.name = purify.sanitize(this.name);
  this.message = purify.sanitize(this.message);
  next();
});

const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;
