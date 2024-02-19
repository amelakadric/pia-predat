import { Request, Response, NextFunction } from "express";
import Lecture from "../models/Lecture";
import mongoose from "mongoose";
import User from "../models/User";

export class TeacherController {
  async getTeacherUpcomingLectures(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const teacherId = req.userId;

    const lecturesLimit = Number(req.query.lecturesLimit);

    const today = new Date();
    const threeDaysFromNow = new Date(today);
    threeDaysFromNow.setDate(today.getDate() + 3);

    const teacherLectures = await Lecture.find({
      professorId: teacherId,
      scheduledAt: { $lt: threeDaysFromNow, $gt: today },
      canceled: false,
      acceptedByProfessor: true,
    })
      .sort({ scheduledAt: 1 })
      .limit(lecturesLimit)
      .populate("professor")
      .populate("subject")
      .populate("student");
    return res.status(200).json(teacherLectures);
  }

  async getTeacherLectureRequests(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const teacherId = req.userId;

    const teacherLectureRequests = await Lecture.find({
      professorId: teacherId,
      canceled: false,
      acceptedByProfessor: false,
      rejectedByProfessor: false,
    })
      .sort({ scheduledAt: 1 })
      .populate("professor")
      .populate("subject")
      .populate("student");
    return res.status(200).json(teacherLectureRequests);
  }

  async acceptLecture(req: Request, res: Response, next: NextFunction) {
    const lectureId = req.params.lectureId;

    const acceptedLecture = await Lecture.findOneAndUpdate(
      {
        _id: lectureId,
      },
      { acceptedByProfessor: true },
      { new: true },
    )
      .populate("professor")
      .populate("subject")
      .populate("student");
    return res.status(200).json(acceptedLecture);
  }

  async rejectLecture(req: Request, res: Response, next: NextFunction) {
    const lectureId = req.params.lectureId;

    const { rejectionReason } = req.body;

    const rejectedLeceture = await Lecture.findOneAndUpdate(
      {
        _id: lectureId,
      },
      { rejectionReason, rejectedByProfessor: true },
      { new: true },
    )
      .populate("professor")
      .populate("subject")
      .populate("student");
    return res.status(200).json(rejectedLeceture);
  }

  async cancelLecture(req: Request, res: Response, next: NextFunction) {
    const lectureId = req.params.lectureId;

    const { cancelationReason } = req.body;

    console.log("cancelationReason", cancelationReason);

    const canceledLecture = await Lecture.findOneAndUpdate(
      {
        _id: lectureId,
      },
      { cancelationReason, canceled: true },
      { new: true },
    )
      .populate("professor")
      .populate("subject")
      .populate("student");
    return res.status(200).json(canceledLecture);
  }

  async getStudentsByTeacherId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const professorId = req.userId;

    const canceledLecture = await Lecture.find({
      professorId: professorId,
    }).populate("student");
    // @ts-ignore
    const students = canceledLecture.map((lecture) => lecture.student);
    const uniqueStudents = Array.from(new Set(students));
    return res.status(200).json(uniqueStudents);
  }

  async getStudentInfo(req: Request, res: Response, next: NextFunction) {
    const professorId = req.userId;
    const studentId = req.params.studentId;

    const student = await User.findById(studentId);

    const lecturesBySubject = await Lecture.aggregate([
      {
        $match: {
          professorId: new mongoose.Types.ObjectId(professorId),
          studentId: new mongoose.Types.ObjectId(studentId),
          completed: true,
          acceptedByProfessor: true,
        },
      },
      {
        $lookup: {
          from: "subjects",
          localField: "subjectId",
          foreignField: "_id",
          as: "subject",
        },
      },
      {
        $unwind: {
          path: "$subject",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: {
            subjectId: "$subject._id",
            subjectName: "$subject.subject",
          },
          lectures: {
            $push: {
              _id: "$_id",
              scheduledAt: "$scheduledAt",
              studentRating: "$studentRating",
              studentRateComment: "$studentRateComment",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          subjectId: "$_id.subjectId",
          subjectName: "$_id.subjectName",
          lectures: 1,
        },
      },
    ]);

    return res.status(200).json({ student, lecturesBySubject });
  }
}
