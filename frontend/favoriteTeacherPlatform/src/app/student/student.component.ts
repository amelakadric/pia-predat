import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user';
import { LectureService } from '../services/lecture/lecture.service';
import { Lecture } from '../models/lecture';
import { RateTeacherModal } from '../services/modal/rate-teacher-modal.service';

declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  @ViewChild('meet') meetContainer!: ElementRef;
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private lectureService: LectureService,
    private rateTeacher: RateTeacherModal
  ) {}

  user: User = new User();
  pastLectures: Lecture[] = [];
  upcomingLectures: Lecture[] = [];

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    }
    this.setUpcomingLecturesOnInit();
    this.setPastLecturesOnInit();
    this.rateTeacher.ratingSubmitted.subscribe(() => {
      // Call setLecturesOnInit when a rating is submitted
      this.setPastLecturesOnInit();
    });
  }

  setUpcomingLecturesOnInit() {
    this.lectureService
      .getStudentUpcomingLectures()
      .subscribe((upcomingLectures) => {
        this.upcomingLectures = upcomingLectures;
      });
  }

  setPastLecturesOnInit() {
    this.lectureService.getStudentPastLectures().subscribe((pastLectures) => {
      this.pastLectures = pastLectures;
    });
  }

  isScheduledWithin30Minutes(scheduledAt: Date): boolean {
    const now = new Date();
    const scheduledTime = new Date(scheduledAt);
    const timeDifference = scheduledTime.getTime() - now.getTime();
    const minutesDifference = timeDifference / (1000 * 60);
    return minutesDifference <= 30;
  }

  initializeJitsiMeet(lectureId: string) {
    const domain = 'meet.jit.si';
    const options = {
      roomName: lectureId,
      width: 700,
      height: 700,
      parentNode: this.meetContainer.nativeElement,
      lang: 'en',
    };

    const api = new JitsiMeetExternalAPI(domain, options);

    this.lectureService
      .completeLecture({ lectureId })
      .subscribe((pastLectures) => {
        this.setUpcomingLecturesOnInit();
        this.setPastLecturesOnInit();
      });
  }

  handleRateLecture(lectureId: string) {
    this.rateTeacher.openModal(lectureId);
  }
}
