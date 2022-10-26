import mongoose from "mongoose";
import validator from "validator";
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid!");
      }
    },
  },
  createdOn: { type: Date, default: Date.now },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isAuthenticated: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("Email already exists!"));
  } else {
    next();
  }
});

userSchema.post("update", function (error, res, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("Email already exists!"));
  } else {
    next();
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
