export interface LeatureCreate {
  name: string;
}

export interface Leature extends LeatureCreate {
  id: number;
  created_at: string;
  updated_at: string;
}
