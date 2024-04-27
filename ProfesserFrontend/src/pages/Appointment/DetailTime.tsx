import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';

import { createStudentSchedule, getAllAvailableTime } from '@/api';
import { INPUT, QUERY } from '@/constants';
import { useCustomMutation, useCustomQuery } from '@/lib';
import { AvailableTime } from '@/types';

interface DetailTimeProps {
  professor_id: number | string;
  filter: any;
}

const DetailTime = ({ professor_id, filter }: DetailTimeProps) => {
  const theme = useTheme();

  const { data } = useCustomQuery(
    [
      QUERY.KEY.ALL_AVAILABLE_TIME,
      { date: filter[INPUT.APPOINTMENT_DATE.name] },
    ],
    () =>
      getAllAvailableTime(professor_id, filter[INPUT.APPOINTMENT_DATE.name]),
    {}
  );

  return (
    <Box
      gap={theme.spacing(1)}
      sx={{
        minHeight: '100hv',
        gap: theme.spacing(2),
        height: '85vh',
        width: '90%',
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography fontSize="18px" fontWeight="bold">
        Choose your time
      </Typography>
      <Typography fontSize="18px" fontWeight="bold">
        {filter[INPUT.APPOINTMENT_DATE.name]}
      </Typography>
      {(data?.data?.items || []).map((available_time: AvailableTime) => (
        <TimePicker
          available_time={available_time}
          key={available_time.start_time}
          professor_id={professor_id}
          filter={filter}
        />
      ))}
    </Box>
  );
};

interface TimePickerProps {
  available_time: AvailableTime;
  professor_id: number | string;
  filter: any;
}

const TimePicker = ({
  available_time,
  professor_id,
  filter,
}: TimePickerProps) => {
  const start = dayjs(available_time.start_time).format('HH:mm');
  const end = dayjs(available_time.start_time)
    .add(30, 'minute')
    .format('HH:mm');

  const { mutate } = useCustomMutation(
    () =>
      createStudentSchedule(professor_id, {
        topic: filter[INPUT.APPOINTMENT_TOPIC.name],
        date: filter[INPUT.APPOINTMENT_DATE.name],
        time: start,
      }),
    {
      SuccessQueryKey: QUERY.KEY.ALL_AVAILABLE_TIME,
      SuccessMessage: 'Appointment success',
    }
  );

  return (
    <Box
      sx={{
        backgroundColor: 'primary.light',
        padding: 2,
        borderRadius: 1,
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography fontWeight="bold" fontSize="16px">
        {start} ~ {end}
      </Typography>
      <Button variant="contained" onClick={mutate}>
        Select
      </Button>
    </Box>
  );
};

export default DetailTime;
