const AUTH = Object.freeze({
  LOG_IN: '/v1/student/login',
  SIGN_UP: '/v1/student/signup',
  ME: '/v1/student/me',
});

const SCHEDULE = Object.freeze({
  GET_BY_ID: (id: number | string) => `/v1/schedule/${id}`,
  GET_MY_ALL: '/v1/schedule/my/all',
  GET_MY_ACTIVE_ALL: '/v1/schedule/my/all/active',
  CREATE: (professor_id: number | string) => `/v1/schedule/${professor_id}`,
  DELETE_BY_ID: (id: number | string) => `/v1/schedule/${id}`,
});

const PROFESSOR = Object.freeze({
  GET_BY_ID: (id: number | string) => `/v1/professor/${id}`,
  GET_ALL: '/v1/professor/all',
});

const FIXED_TIME = Object.freeze({
  GET_AVAILABLE_TIME: (professor_id: number | string, date: string) =>
    `/v1/fixed_schedule/${professor_id}/all_available_time/${date}`,
});

export const API_ROUTE = Object.freeze({
  AUTH,
  SCHEDULE,
  PROFESSOR,
  FIXED_SCHEDULE: FIXED_TIME,
});
