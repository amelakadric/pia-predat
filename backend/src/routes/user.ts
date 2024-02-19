const express = require("express");
import { Router } from "express";
import { UserController } from "../controllers/user";

const userController = new UserController();

const router = Router();

router.post("/update", userController.update);
router.post("/setApproved", userController.setApproved);

router.get("/getAll", userController.getAll);
router.post("/getUser", userController.getUser);

router.get("/getRequestedUsers", userController.getRequestedUsers);

router.get("/getTeachers", userController.getTeachers);
router.get("/getActiveTeachers", userController.getActiveTeachers);
router.get("/getStudents", userController.getStudents);

router.get("/lectures/past", userController.getStudentPastLectures);
router.get("/lectures/upcoming", userController.getStudentUpcomingLectures);

export default router;
