import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { LectureService } from '../services/lecture/lecture.service';

@Component({
  selector: 'app-rate-teacher-modal',
  templateUrl: './rate-teacher-modal.component.html',
  styleUrls: ['./rate-teacher-modal.component.css'],
  providers: [NgbRatingConfig],
})
export class RateTeacherModalComponent {
  @Output() professorRatingSubmitted = new EventEmitter<void>();
  @Input() lectureId: string = '';

  professorRating = 0;
  professorRateComment: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    config: NgbRatingConfig,
    private lectureService: LectureService
  ) {
    config.max = 5;
  }

  async submit() {
    this.lectureService
      .rateTeacher({
        lectureId: this.lectureId,
        professorRateComment: this.professorRateComment,
        professorRating: this.professorRating,
      })
      .subscribe(() => {
        this.professorRatingSubmitted.emit();
        this.activeModal.close();
      });
  }
}
