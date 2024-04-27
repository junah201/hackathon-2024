export interface StudentCreate {
  name: string;
  email: string;
  password: string;
}

export interface Student extends StudentCreate {
  id: number;
  created_at: string;
  updated_at: string;
}
