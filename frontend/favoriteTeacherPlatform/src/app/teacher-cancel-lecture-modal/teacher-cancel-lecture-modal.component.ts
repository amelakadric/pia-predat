import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { LectureService } from '../services/lecture/lecture.service';
import { Notification } from '../models/notification';

@Component({
  selector: 'app-teacher-cancel-lecture-modal',
  templateUrl: './teacher-cancel-lecture-modal.component.html',
  styleUrls: ['./teacher-cancel-lecture-modal.component.css'],
  providers: [NgbRatingConfig],
})
export class TeacherCancelLectureModalComponent {
  @Output() professorCancelledLecture = new EventEmitter<void>();
  @Input() lectureId: string = '';

  cancelationReason: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    config: NgbRatingConfig,
    private lectureService: LectureService
  ) {
    config.max = 5;
  }

  async submit() {
    this.lectureService
      .teacherCancelLecture({
        lectureId: this.lectureId,
        cancelationReason: this.cancelationReason,
      })
      .subscribe(() => {
        this.lectureService.getAllLectures().subscribe((allLectures) => {
          let l = allLectures.find((e) => e._id == this.lectureId);
          const n = new Notification();
          n.message =
            'Proffesor ' +
            l?.professor.username +
            ' canceled lecture scheduled at ' +
            l?.scheduledAt +
            ' with reason: ' +
            this.cancelationReason;
          if (l?.studentId) {
            n.studentId = l?.studentId;
          }
          this.lectureService.createNotification(n).subscribe();
        });

        this.professorCancelledLecture.emit();
        this.activeModal.close();
      });
  }
}
