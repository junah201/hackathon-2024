export interface AvailableTime {
  start_time: string;
  available: boolean;
}

export interface AvailableTimeList {
  items: AvailableTime[];
  total: number;
}
