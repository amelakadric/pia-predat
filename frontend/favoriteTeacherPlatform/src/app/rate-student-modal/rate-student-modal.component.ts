import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { LectureService } from '../services/lecture/lecture.service';

@Component({
  selector: 'app-rate-student-modal',
  templateUrl: './rate-student-modal.component.html',
  providers: [NgbRatingConfig],
})
export class RateStudentModalComponent {
  @Output() studentRatingSubmitted = new EventEmitter<void>();
  @Input() lectureId: string = '';

  studentRating = 0;
  studentRateComment: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    config: NgbRatingConfig,
    private lectureService: LectureService
  ) {
    config.max = 5;
  }

  async submit() {
    this.lectureService
      .rateStudent({
        lectureId: this.lectureId,
        studentRateComment: this.studentRateComment,
        studentRating: this.studentRating,
      })
      .subscribe(() => {
        this.studentRatingSubmitted.emit();
        this.activeModal.close();
      });
  }
}
