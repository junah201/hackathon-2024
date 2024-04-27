import { API_ROUTE } from '@/constants';
import { Axios } from '@/lib';
import { Schedule, ScheduleStudentCreate, ScheduleList } from '@/types';

const authAxios = new Axios(true);

export const getMyAllSchedule = async (skip: number, limit: number) => {
  const res = await authAxios.getByParams<ScheduleList>(
    API_ROUTE.PROFESSOR_SCHEDULE.GET_MY_ALL,
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};

export const getMyAllActiveSchedule = async (skip: number, limit: number) => {
  const res = await authAxios.getByParams<ScheduleList>(
    API_ROUTE.PROFESSOR_SCHEDULE.GET_MY_ACTIVE_ALL,
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};

export const getScheduleById = async (id: number | string) => {
  const res = await authAxios.get<Schedule>(API_ROUTE.SCHEDULE.GET_BY_ID(id));

  return res;
};

export const createStudentSchedule = async (
  professor_id: number | string,
  data: ScheduleStudentCreate
) => {
  const res = await authAxios.post(
    API_ROUTE.SCHEDULE.CREATE(professor_id),
    data
  );

  return res;
};

export const deleteScheduleById = async (id: number | string) => {
  const res = await authAxios.delete(API_ROUTE.SCHEDULE.DELETE_BY_ID(id));

  return res;
};
