export const subjectOptions = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Urdu",
  "Computer Science",
  "History",
  "Geography",
  "Islamic Studies",
];

export interface Student {
  // id: string;
  name: string;
  fatherName: string;
  age: string;
  dateOfBirth: string;
  gender: string;
  grade: string;
  classSection: string;
  rollNumber: string;
  gpa: string;
  email: string;
  phoneNumber: string;
  status: string;
  address: string;
  subjects: string[];
}

export interface StudentState {
  student: Student[];
  loading: boolean;
  error: string | null;
}
