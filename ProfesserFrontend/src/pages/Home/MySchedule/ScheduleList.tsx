import Schedule from './Schedule';

import { getMyAllActiveSchedule } from '@/api';
import { QUERY } from '@/constants';
import { useCustomQuery } from '@/lib';

const ScheduleList = () => {
  const { data } = useCustomQuery(
    [QUERY.KEY.MY_ALL_SCHEDULE, { limit: 5 }],
    () => getMyAllActiveSchedule(0, 5),
    {}
  );

  if (!data?.data) return <></>;

  return (
    <>
      {data?.data.items.map((s) => (
        <Schedule schedule={s} key={s.id} />
      ))}
    </>
  );
};

export default ScheduleList;
