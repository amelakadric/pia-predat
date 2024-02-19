import { Schema, model } from "mongoose";

const User = new Schema({
  email: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  password: {
    type: String,
  },
  type: {
    type: String,
  },
  username: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  gender: {
    type: String,
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  safetyQuestion: {
    type: String,
  },
  safetyAnswer: {
    type: String,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  schoolType: {
    type: String,
  },
  year: {
    type: Number,
  },
  cv: {
    type: String,
  },
  subjects: {
    type: [String],
  },
  ageWishes: {
    type: [Number],
  },
  heardAboutSite: {
    type: String,
  },
  isProcessed: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

export default model("User", User, "users");
