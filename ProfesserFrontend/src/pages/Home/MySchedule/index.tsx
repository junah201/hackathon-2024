import { Typography, useTheme } from '@mui/material';

import ScheduleList from './ScheduleList';

import MainCard from '@/components/MainCard';

const MySchedule = () => {
  const theme = useTheme();

  return (
    <MainCard
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100hv',
        gap: theme.spacing(2),
        height: '80vh',
        width: '100%',
        overflowY: 'scroll',
      }}
    >
      <Typography fontSize="18px">My Schedules</Typography>
      <ScheduleList />
    </MainCard>
  );
};

export default MySchedule;
