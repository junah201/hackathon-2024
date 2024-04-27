import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { useTheme, Typography, Box } from '@mui/material';
import dayjs from 'dayjs';

import CancelButton from './CancelButton';

import Avatar from '@/components/Avatar';
import MainCard from '@/components/MainCard';
import { Schedule as ScheduleType } from '@/types';

interface ScheduleProps {
  schedule: ScheduleType;
}

const Schedule = ({ schedule }: ScheduleProps) => {
  const theme = useTheme();
  const startTime = dayjs(schedule.start_time).format('YYYY-MM-DD HH:mm');
  const endTime = dayjs(schedule.end_time).format('HH:mm');

  return (
    <MainCard
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.primary.light,
      }}
      gap={theme.spacing(2)}
    >
      <Box display="flex" justifyContent="space-between" gap={theme.spacing(2)}>
        <Box display="flex" alignItems="center" gap={theme.spacing(2)}>
          <Avatar
            alt={schedule.professor.name}
            src={schedule.professor.profile}
          />
          <Typography fontSize="18px" fontWeight="bold">
            {schedule.professor.name}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" gap={theme.spacing(2)}>
        <FmdGoodOutlinedIcon />
        <Typography fontSize="16px" fontWeight="bold">
          {schedule.professor.office}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={theme.spacing(2)}>
        <AccessTimeOutlinedIcon />
        <Typography fontSize="18px" fontWeight="bold">
          {startTime} ~ {endTime}
        </Typography>
      </Box>
      <CancelButton id={schedule.id} />
    </MainCard>
  );
};

export default Schedule;
