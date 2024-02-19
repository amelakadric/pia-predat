import { Router } from "express";
import { LectureController } from "../controllers/lecture";

const lectureController = new LectureController();

const router = Router();

router.post("/", lectureController.createLecture);
router.post("/rate/:lectureId", lectureController.rateLectureProfessor);
router.post("/rate/student/:lectureId", lectureController.rateLectureStudent);
router.get("/", lectureController.getAllLectures);
router.patch("/complete-lecture/:lectureId", lectureController.completeLecture);

export default router;
