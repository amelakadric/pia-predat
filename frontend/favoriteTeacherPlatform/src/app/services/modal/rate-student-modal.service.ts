import { EventEmitter, Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RateStudentModalComponent } from 'src/app/rate-student-modal/rate-student-modal.component';

@Injectable({
  providedIn: 'root',
})
export class RateStudentModal {
  private modalRef: NgbModalRef | null = null;

  studentRatingSubmitted = new EventEmitter<void>();

  constructor(private modalService: NgbModal) {}

  openModal(lectureId: string) {
    this.modalRef = this.modalService.open(RateStudentModalComponent, {
      centered: true,
    });
    this.modalRef.componentInstance.lectureId = lectureId;
    this.modalRef.componentInstance.studentRatingSubmitted.subscribe(() => {
      // Emit the event to notify student.component
      this.studentRatingSubmitted.emit();
    });
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }
}
