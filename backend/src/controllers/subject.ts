import * as express from "express";

import { error } from "console";
import { HttpError } from "../errors/httpError";
import Subject from "../models/Subject";
import SubjectRequest from "../models/SubjectRequest";
import Notification from "../models/Notification";

const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

export class SubjectController {
  getSubjectId = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const subjectName = req.body.subjectName;

    const subject = await Subject.findOne({ subject: subjectName });

    res.json(subject?._id);
  };

  createSubject = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const subject = req.body.subject;
    console.log(subject);

    const newSubject = new Subject({ subject: subject.subject });
    await newSubject.save();
    res.json(newSubject);
  };

  getAllSubjects = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const subjects = await Subject.find();
    res.json(subjects);
  };

  createSubjectRequest = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const subject = req.body.subject;
    const teacherUsername = req.body.teacherUsername;
    console.log("ovde");

    const newSubjectReq = new SubjectRequest({
      subject: subject,
      teacherUsername: teacherUsername,
    });
    await newSubjectReq.save();
    res.json(newSubjectReq);
  };

  getAllSubjectRequests = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const subjectReqs = await SubjectRequest.find();
    res.json(subjectReqs);
  };

  deleteSubjectRequest = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const subject = req.body.subject;
    await SubjectRequest.deleteOne({ subject: subject });
    res.status(200);
  };

  createNotification = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const message = req.body.message;
    const studentId = req.body.studentId;

    const notification = new Notification({
      message: message,
      studentId: studentId,
    });

    await notification.save();

    res.json(notification);
  };

  getNotifications = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const userId = req.userId;

    const notifications = await Notification.find({ studentId: userId });
    res.json(notifications);
  };

  updateNotification = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const viewed = req.body.viewed;
    console.log(viewed);
    const messageId = req.body.messageId;

    const notif = await Notification.findOne({ _id: messageId });
    if (notif) notif.viewed = viewed;

    await notif?.save();
    res.json(notif);
  };
}
