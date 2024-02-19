const express = require("express");
import { Router } from "express";
import { AuthController } from "../controllers/auth";
import { SubjectController } from "../controllers/subject";

const authController = new AuthController();

const subjectController = new SubjectController();

const router = Router();

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.post("/newSubject", subjectController.createSubject);
router.get("/getAllSubjects", subjectController.getAllSubjects);
router.post("/getSubjectId", subjectController.getSubjectId);

router.post("/newSubjectRequest", subjectController.createSubjectRequest);
router.get("/getAllSubjectRequests", subjectController.getAllSubjectRequests);
router.post("/deleteSubjectRequest", subjectController.deleteSubjectRequest);

router.post("/uploadPicture", authController.upload);
router.post("/uploadCV", authController.uploadCV);
router.post("/createNotification", subjectController.createNotification);
router.post("/getNotifications", subjectController.getNotifications);
router.post("/updateNotification", subjectController.updateNotification);

export default router;
