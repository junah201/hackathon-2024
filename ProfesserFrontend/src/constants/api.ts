const AUTH = Object.freeze({
  LOG_IN: '/v1/professor/login',
  SIGN_UP: '/v1/professor/signup',
  ME: '/v1/professor/me',
});

const SCHEDULE = Object.freeze({
  GET_BY_ID: (id: number | string) => `/v1/schedule/${id}`,
  GET_MY_ALL: '/v1/schedule/my/all',
  GET_MY_ACTIVE_ALL: '/v1/schedule/my/all/active',
  CREATE: (professor_id: number | string) => `/v1/schedule/${professor_id}`,
  DELETE_BY_ID: (id: number | string) => `/v1/schedule/${id}`,
});

const PROFESSOR_SCHEDULE = Object.freeze({
  GET_BY_ID: (id: number | string) => `/v1/professor_schedule/${id}`,
  GET_MY_ALL: '/v1/professor_schedule/my/all',
  GET_MY_ACTIVE_ALL: '/v1/professor_schedule/my/all/active',
});

const PROFESSOR = Object.freeze({
  GET_BY_ID: (id: number | string) => `/v1/professor/${id}`,
  GET_ALL: '/v1/professor/all',
});

const FIXED_SCHEDULE = Object.freeze({
  GET_AVAILABLE_TIME: (professor_id: number | string, date: string) =>
    `/v1/fixed_schedule/${professor_id}/all_available_time/${date}`,
});

export const API_ROUTE = Object.freeze({
  AUTH,
  SCHEDULE,
  PROFESSOR,
  FIXED_SCHEDULE,
  PROFESSOR_SCHEDULE,
});
