import { API_ROUTE } from '@/constants';
import { Axios } from '@/lib';
import { AvailableTimeList } from '@/types';

const authAxios = new Axios(true);

export const getAllAvailableTime = async (
  professor_id: number | string,
  date: string
) => {
  const res = await authAxios.get<AvailableTimeList>(
    API_ROUTE.FIXED_SCHEDULE.GET_AVAILABLE_TIME(professor_id, date)
  );

  return res;
};
