import { Schema, model } from "mongoose";

const Subject = new Schema({
  subject: {
    type: String,
    required: true,
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
});

export default model("Subject", Subject, "subjects");
