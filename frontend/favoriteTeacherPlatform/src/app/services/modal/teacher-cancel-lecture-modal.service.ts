import { EventEmitter, Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TeacherCancelLectureModalComponent } from 'src/app/teacher-cancel-lecture-modal/teacher-cancel-lecture-modal.component';

@Injectable({
  providedIn: 'root',
})
export class TeacherCancelLectureModal {
  private modalRef: NgbModalRef | null = null;

  cancelLectureSubmitted = new EventEmitter<void>();

  constructor(private modalService: NgbModal) {}

  openModal(lectureId: string) {
    this.modalRef = this.modalService.open(TeacherCancelLectureModalComponent, {
      centered: true,
    });
    this.modalRef.componentInstance.lectureId = lectureId;
    this.modalRef.componentInstance.professorCancelledLecture.subscribe(() => {
      this.cancelLectureSubmitted.emit();
    });
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }
}
