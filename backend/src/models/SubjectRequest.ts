import { Schema, model } from "mongoose";

const SubjectRequest = new Schema({
  subject: {
    type: String,
    required: true,
  },
  teacherUsername: {
    type: String,
  },
});

export default model("SubjectRequest", SubjectRequest, "subjectRequests");
