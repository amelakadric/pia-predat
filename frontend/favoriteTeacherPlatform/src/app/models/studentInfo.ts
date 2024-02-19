import { User } from './user';

export class LectureMinified {
  constructor(
    public _id: string,
    public scheduledAt: string,
    public studentRating?: number,
    public studentRateComment?: string
  ) {}
}

export class LectureBySubject {
  constructor(
    public lectures: LectureMinified[],
    public subjectId: string,
    public subjectName: string
  ) {}
}

export class StudentInfo {
  constructor(
    public student: User,
    public lecturesBySubject: LectureBySubject[]
  ) {}
}
