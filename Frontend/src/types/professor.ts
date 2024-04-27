import { Leature } from './leature';

export interface ProfessorCreate {
  name: string;
  email: string;
  password: string;
  profile: string;
  major: string;
  office: string;
}

export interface Professor extends ProfessorCreate {
  id: number;
  lectures: Leature[];
  created_at: string;
  updated_at: string;
}

export interface ProfessorList {
  items: Professor[];
  total: number;
}
