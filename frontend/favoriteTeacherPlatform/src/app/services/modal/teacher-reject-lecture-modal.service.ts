import { EventEmitter, Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TeacherRejectLectureModalComponent } from 'src/app/teacher-reject-lecture-modal/teacher-reject-lecture-modal.component';

@Injectable({
  providedIn: 'root',
})
export class TeacherRejectLectureModal {
  private modalRef: NgbModalRef | null = null;

  rejectLectureSubmitted = new EventEmitter<void>();

  constructor(private modalService: NgbModal) {}

  openModal(lectureId: string) {
    this.modalRef = this.modalService.open(TeacherRejectLectureModalComponent, {
      centered: true,
    });
    this.modalRef.componentInstance.lectureId = lectureId;
    this.modalRef.componentInstance.professorRejectedLecture.subscribe(() => {
      this.rejectLectureSubmitted.emit();
    });
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }
}
