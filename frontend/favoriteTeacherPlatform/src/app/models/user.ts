export class User {
  _id: string = '';
  email: string = '';
  firstname: string = '';
  lastname: string = '';
  password: string = '';
  type: string = '';
  username: string = '';
  profilePicture: string = '';
  gender: string = '';
  address: string = '';
  phoneNumber: string = '';
  safetyQuestion: string = '';
  safetyAnswer: string = '';
  isApproved: boolean = false;
  age?: number = 0;
  schoolType: string = '';
  year: number = 0;
  cv: string = '';
  subjects: string[] = [];
  ageWishes: number[] = [];
  heardAboutSite: string = '';
  rating?: number = 0;
}