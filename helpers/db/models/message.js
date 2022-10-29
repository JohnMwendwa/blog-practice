import mongoose from "mongoose";
import validator from "validator";
const { Schema } = mongoose;

const messageSchema = new Schema({
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
  Date: { type: Date, default: Date.now },
});

const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;
