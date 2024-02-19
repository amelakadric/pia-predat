import { Subject } from './subject';
import { User } from './user';

export class Lecture {
  constructor(
    public _id: string,
    public scheduledAt: Date,
    public duration: number,
    public subjectId: string,
    public professorId: string,
    public studentId: string,
    public completed: boolean,
    public professor: User,
    public subject: Subject,
    public student: User,
    public professorComment?: string,
    public professorRateComment?: string,
    public professorRating?: number,
    public studentRating?: number,
    public studentRateComment?: string,
    public studentComment?: string,
    public acceptedByProfessor?: boolean,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
