import { Schema, model } from "mongoose";

const Lecture = new Schema(
  {
    scheduledAt: {
      type: Date,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      required: true,
    },
    subjectId: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
    },
    professorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    professorComment: {
      type: String,
    },
    cancelationReason: {
      type: String,
    },
    rejectionReason: {
      type: String,
    },
    canceled: {
      type: Boolean,
      default: false,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    acceptedByProfessor: {
      type: Boolean,
      default: false,
    },
    rejectedByProfessor: {
      type: Boolean,
      default: false,
    },
    studentRating: {
      type: Number,
      min: 1,
      max: 5,
    },
    studentRateComment: {
      type: String,
    },
    professorRating: {
      type: Number,
      min: 1,
      max: 5,
    },
    professorRateComment: {
      type: String,
    },
    studentComment: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

Lecture.virtual("professor", {
  localField: "professorId",
  foreignField: "_id",
  ref: "User",
  justOne: true,
});

Lecture.virtual("subject", {
  localField: "subjectId",
  foreignField: "_id",
  ref: "Subject",
  justOne: true,
});

Lecture.virtual("student", {
  ref: "User",
  localField: "studentId",
  foreignField: "_id",
  justOne: true,
});

export default model("Lecture", Lecture, "lectures");
