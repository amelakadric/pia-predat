import { Router } from "express";
import { TeacherController } from "../controllers/teacher";

const teacherController = new TeacherController();

const router = Router();

router.get("/upcoming-lectures", teacherController.getTeacherUpcomingLectures);
router.get("/lecture-requests", teacherController.getTeacherLectureRequests);
router.get("/students", teacherController.getStudentsByTeacherId);
router.get(
  "/students/student-info/:studentId",
  teacherController.getStudentInfo,
);
router.patch("/cancel-lecture/:lectureId", teacherController.cancelLecture);
router.patch("/accept-lecture/:lectureId", teacherController.acceptLecture);
router.patch("/reject-lecture/:lectureId", teacherController.rejectLecture);

export default router;
