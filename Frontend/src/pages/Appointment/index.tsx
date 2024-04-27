import { Box, Grid, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import DayTopic from './DayTopic';
import DetailTime from './DetailTime';
import ProfessorInfo from './ProfessorInfo';

import MainCard from '@/components/MainCard';
import { INPUT } from '@/constants';

const Appointment = () => {
  const theme = useTheme();
  const { id } = useParams() as { id: string };

  const [filter, setFilter] = useState<any>({
    [INPUT.APPOINTMENT_DATE.name]: dayjs().format('YYYY-MM-DD'),
    [INPUT.APPOINTMENT_TOPIC.name]: '',
  });

  return (
    <MainCard>
      <Grid container spacing={theme.spacing(2)}>
        <Grid item xs={3}>
          <ProfessorInfo id={id} />
        </Grid>
        <Grid item xs={5}>
          <DayTopic filter={filter} setFilter={setFilter} />
        </Grid>
        <Grid item xs={4}>
          <DetailTime professor_id={id} filter={filter} />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Appointment;
