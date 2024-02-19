import * as express from "express";

import User from "../models/User";
import { HttpError } from "../errors/httpError";
import Lecture from "../models/Lecture";
const bcrypt = require("bcrypt");

export class UserController {
  update = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const userId = req.body.userId;
      const updateData = req.body.userData;

      const user = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
      });
      let u = await User.findById(userId);
      if (u) {
        u.isApproved = true;
        await u.save();
      }
      res.json(user);
    } catch (err) {
      next(err);
    }
  };

  setApproved = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const userId = req.body.userId;
      const isApproved = req.body.isApproved;

      let user = await User.findById(userId);
      if (user) {
        user.isApproved = isApproved;
        user.isProcessed = true;
        await user.save();
      }
      res.json(user);
    } catch (err) {
      next(err);
    }
  };

  getUser = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const username = req.body.username;

      const user = await User.findOne({ username: username });
      res.json(user);
    } catch (err) {
      next(err);
    }
  };

  getAll = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const users = await User.find();
    res.json(users);
  };

  getRequestedUsers = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    let users = await User.find({ type: "teacher", isProcessed: false });

    res.json(users);
  };

  getActiveTeachers = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    let users = await User.find({ type: "teacher", isApproved: true });
    res.json(users);
  };

  getTeachers = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    let teachers = await User.find({ type: "teacher" });
    res.json(teachers);
  };

  getStudents = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    let students = await User.find({ type: "student" });
    res.json(students);
  };

  getStudentPastLectures = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const studentLectures = await Lecture.find({
      scheduledAt: { $lt: new Date() },
    })
      .populate("professor")
      .populate("subject")
      .where("studentId")
      .equals(req.userId)
      .sort({ scheduledAt: 1 });
    return res.status(200).json(studentLectures);
  };

  getStudentUpcomingLectures = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const studentLectures = await Lecture.find({
      scheduledAt: { $gt: new Date() },
    })
      .populate("professor")
      .populate("subject")
      .where("studentId")
      .equals(req.userId)
      .sort({ scheduledAt: 1 });
    return res.status(200).json(studentLectures);
  };
}
