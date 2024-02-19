import { Component, OnInit } from '@angular/core';
import { LectureService } from '../services/lecture/lecture.service';
import { User } from '../models/user';

@Component({
  selector: 'app-teacher-students',
  templateUrl: './teacher-students.component.html',
  styleUrls: ['./teacher-students.component.css'],
})
export class TeacherStudentsComponent implements OnInit {
  constructor(private lectureService: LectureService) {}

  teacherStudents: User[] = [];

  ngOnInit(): void {
    this.setTeacherStudents();
  }

  setTeacherStudents() {
    this.lectureService.getTeacherStudents().subscribe((teacherStudents) => {
      this.teacherStudents = teacherStudents;
    });
  }
}
