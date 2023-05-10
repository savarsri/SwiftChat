const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    immutable: true,
    unique: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: "Please Provide Email",
    },
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: image,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
