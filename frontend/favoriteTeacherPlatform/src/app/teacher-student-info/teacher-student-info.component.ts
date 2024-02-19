import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LectureService } from '../services/lecture/lecture.service';
import { LectureBySubject, StudentInfo } from '../models/studentInfo';
import { User } from '../models/user';
import { RateStudentModal } from '../services/modal/rate-student-modal.service';

@Component({
  selector: 'app-teacher-student-info',
  templateUrl: './teacher-student-info.component.html',
  styleUrls: ['./teacher-student-info.component.css'],
})
export class TeacherStudentInfoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private lectureService: LectureService,
    private rateStudent: RateStudentModal
  ) {}

  student?: User;
  lecturesBySubject: LectureBySubject[] = [];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const studentId = params['studentId'];
      this.setStudentInfo(studentId);
    });

    this.rateStudent.studentRatingSubmitted.subscribe(() => {
      this.setStudentInfo(this.student?._id || '');
    });
  }

  setStudentInfo(studentId: string) {
    this.lectureService.getStudentInfo(studentId).subscribe((studentInfo) => {
      this.student = studentInfo.student;
      this.lecturesBySubject = studentInfo.lecturesBySubject;
    });
  }

  async handleRateStudent(lectureId: string) {
    this.rateStudent.openModal(lectureId);
  }
}
