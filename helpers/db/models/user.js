import mongoose from "mongoose";
import validator from "validator";
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  createdOn: { type: Date, default: Date.now },
  isAdmin: Boolean,
  isAuthenticated: Boolean,
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid!");
      }
    },
  },
});

const User = mongoose.model(User, userSchema);
