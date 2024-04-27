import { getMyAllSchedule } from '@/api/professor_schedule';
import Calender from '@/components/Calendar';
import { QUERY } from '@/constants';
import { useCustomQuery } from '@/lib';

const MyCalendar = () => {
  const { data } = useCustomQuery(
    [QUERY.KEY.MY_ALL_SCHEDULE, { limit: 100 }],
    () => getMyAllSchedule(0, 100),
    {}
  );

  if (!data?.data) return <></>;

  return <Calender schedules={data?.data?.items || []} />;
};

export default MyCalendar;
