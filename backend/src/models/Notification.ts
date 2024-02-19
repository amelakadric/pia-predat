import { Schema, model } from "mongoose";

const Notification = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    message: {
      type: String,
    },
    viewed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model("Notification", Notification, "notifications");
