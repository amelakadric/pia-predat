import { Request, Response, NextFunction } from "express";
import Lecture from "../models/Lecture";
import User from "../models/User";
import Subject from "../models/Subject";

export class LectureController {
  async createLecture(req: Request, res: Response, next: NextFunction) {
    const {
      scheduledAt,
      duration,
      subjectId,
      professorId,
      professorComment,
      studentId,
      studentComment,
    } = req.body;

    const lecture = new Lecture({
      scheduledAt,
      duration,
      subjectId,
      professorId,
      professorComment,
      studentId,
      studentComment,
    });

    const savedLecture = await lecture.save();

    return res.status(201).json(savedLecture);
  }
  async getAllLectures(req: Request, res: Response, next: NextFunction) {
    const allLectures = await Lecture.find()
      .populate("professor")
      .populate("subject")
      .populate("student");
    return res.status(200).json(allLectures);
  }

  async rateLectureProfessor(req: Request, res: Response, next: NextFunction) {
    const { professorRateComment, professorRating } = req.body;
    const { lectureId } = req.params;
    const lecture = await Lecture.findOneAndUpdate(
      { _id: lectureId },
      { professorRateComment, professorRating },
      { new: true }
    );
    return res.status(200).json(lecture);
  }

  async rateLectureStudent(req: Request, res: Response, next: NextFunction) {
    const { studentRateComment, studentRating } = req.body;
    const { lectureId } = req.params;
    const lecture = await Lecture.findOneAndUpdate(
      { _id: lectureId },
      { studentRateComment, studentRating },
      { new: true }
    );
    return res.status(200).json(lecture);
  }

  async completeLecture(req: Request, res: Response, next: NextFunction) {
    const { lectureId } = req.params;
    const lecture = await Lecture.findOneAndUpdate(
      { _id: lectureId },
      { completed: true },
      { new: true }
    );
    return res.status(200).json(lecture);
  }
}
