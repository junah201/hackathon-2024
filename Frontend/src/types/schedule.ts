import { Professor } from './professor';
import { Student } from './student';

export interface ScheduleCreate {
  topic: string;
  start_time: string;
  end_time: string;
  type: string;
}

export interface ScheduleStudentCreate {
  topic: string;
  date: string;
  time: string;
}

export interface Schedule extends ScheduleCreate {
  id: number;
  professor_id: number;
  professor: Professor;
  student_id: number;
  student: Student;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ScheduleList {
  items: Schedule[];
  total: number;
}
