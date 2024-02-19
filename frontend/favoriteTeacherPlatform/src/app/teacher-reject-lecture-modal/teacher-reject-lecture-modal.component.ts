import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { LectureService } from '../services/lecture/lecture.service';
import { Notification } from '../models/notification';

@Component({
  selector: 'app-teacher-reject-lecture-modal',
  templateUrl: './teacher-reject-lecture-modal.component.html',
  styleUrls: ['./teacher-reject-lecture-modal.component.css'],
  providers: [NgbRatingConfig],
})
export class TeacherRejectLectureModalComponent {
  @Output() professorRejectedLecture = new EventEmitter<void>();
  @Input() lectureId: string = '';

  rejectionReason: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    config: NgbRatingConfig,
    private lectureService: LectureService
  ) {
    config.max = 5;
  }

  async submit() {
    this.lectureService
      .teacherRejectLecture({
        lectureId: this.lectureId,
        rejectionReason: this.rejectionReason,
      })
      .subscribe(() => {
        this.lectureService.getAllLectures().subscribe((allLectures) => {
          let l = allLectures.find((e) => e._id == this.lectureId);
          const n = new Notification();
          n.message =
            'Proffesor ' +
            l?.professor.username +
            ' rejected lecture scheduled at ' +
            l?.scheduledAt +
            ' with reason ' +
            this.rejectionReason;
          if (l?.studentId) {
            n.studentId = l?.studentId;
          }
          this.lectureService.createNotification(n).subscribe((v) => {
            console.log(v);
          });
        });

        this.professorRejectedLecture.emit();
        this.activeModal.close();
      });
  }
}
