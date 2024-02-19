import { EventEmitter, Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RateTeacherModalComponent } from 'src/app/rate-teacher-modal/rate-teacher-modal.component';

@Injectable({
  providedIn: 'root',
})
export class RateTeacherModal {
  private modalRef: NgbModalRef | null = null;

  ratingSubmitted = new EventEmitter<void>();

  constructor(private modalService: NgbModal) {}

  openModal(lectureId: string) {
    this.modalRef = this.modalService.open(RateTeacherModalComponent, {
      centered: true,
    });
    this.modalRef.componentInstance.lectureId = lectureId;
    this.modalRef.componentInstance.professorRatingSubmitted.subscribe(() => {
      // Emit the event to notify student.component
      this.ratingSubmitted.emit();
    });
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }
}
