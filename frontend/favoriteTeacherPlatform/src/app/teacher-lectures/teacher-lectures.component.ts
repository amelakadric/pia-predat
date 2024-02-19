import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LectureService } from '../services/lecture/lecture.service';
import { Lecture } from '../models/lecture';
import { TeacherCancelLectureModal } from '../services/modal/teacher-cancel-lecture-modal.service';
import { TeacherRejectLectureModal } from '../services/modal/teacher-reject-lecture-modal.service';
import { Notification } from '../models/notification';

declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-teacher-lectures',
  templateUrl: './teacher-lectures.component.html',
  styleUrls: ['./teacher-lectures.component.css'],
})
export class TeacherLecturesComponent implements OnInit {
  @ViewChild('meet') meetContainer!: ElementRef;
  constructor(
    private lectureService: LectureService,
    private teacherCancelLectureModalService: TeacherCancelLectureModal,
    private teacherRejectLectureModalService: TeacherRejectLectureModal
  ) {}
  upcomingLectures: Lecture[] = [];
  lectureRequests: Lecture[] = [];
  pageSize: number = 5;

  ngOnInit(): void {
    this.setUpcomingLecturesOnInit();
    this.setTeacherLectureRequests();

    this.teacherCancelLectureModalService.cancelLectureSubmitted.subscribe(
      () => {
        this.setUpcomingLecturesOnInit();
      }
    );

    this.teacherRejectLectureModalService.rejectLectureSubmitted.subscribe(
      () => {
        this.setUpcomingLecturesOnInit();
        this.setTeacherLectureRequests();
      }
    );
  }

  setUpcomingLecturesOnInit() {
    this.lectureService
      .getTeachersUpcomingLectures(this.pageSize)
      .subscribe((upcomingLectures) => {
        this.upcomingLectures = upcomingLectures;
      });
  }

  setTeacherLectureRequests() {
    this.lectureService
      .getTeachersLectureRequests()
      .subscribe((lectureRequests) => {
        this.lectureRequests = lectureRequests;
      });
  }

  onPageSizeChange() {
    console.log('Selected page size:', this.pageSize);
    this.setUpcomingLecturesOnInit();
  }

  isScheduledWithin30Minutes(scheduledAt: Date): boolean {
    const now = new Date();
    const scheduledTime = new Date(scheduledAt);
    const timeDifference = scheduledTime.getTime() - now.getTime();
    const minutesDifference = timeDifference / (1000 * 60);
    return minutesDifference <= 30;
  }
  isWithin4Hours(scheduledAt: Date): boolean {
    const now = new Date();
    const scheduledTime = new Date(scheduledAt);
    const timeDifference = scheduledTime.getTime() - now.getTime();
    const minutesDifference = timeDifference / (1000 * 60);
    return minutesDifference <= 240;
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
    return api;
  }

  openJitsiMeetInNewTab(event: Event, lectureId: string) {
    event.preventDefault();
    const api = this.initializeJitsiMeet(lectureId);
    const url = api.getIFrame().src;
    window.open(url, '_blank');
  }

  handleLectureCancelation(lectureId: string) {
    this.teacherCancelLectureModalService.openModal(lectureId);
  }
  handleRejectLecture(lectureId: string) {
    this.teacherRejectLectureModalService.openModal(lectureId);
  }
  handleAcceptLecture(lectureId: string) {
    this.lectureService.teacherAcceptLecture({ lectureId }).subscribe(() => {
      this.lectureService.getAllLectures().subscribe((allLectures) => {
        let l = allLectures.find((e) => e._id == lectureId);
        console.log(l);
        const n = new Notification();
        n.message =
          'Proffesor ' +
          l?.professor.username +
          ' accepted lecture scheduled at ' +
          l?.scheduledAt;
        if (l?.studentId) {
          n.studentId = l?.studentId;
        }
        this.lectureService.createNotification(n).subscribe((v) => {
          console.log(v);
        });
      });

      this.setTeacherLectureRequests();
      this.setUpcomingLecturesOnInit();
    });
  }
}
