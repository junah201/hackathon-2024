import {
  Grid,
  Button,
  IconButton,
  Box,
  useTheme,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import AppointmentStep1Form from '@/components/forms/AppointmentStep1Form';
import { RegisterField } from '@/constants';

interface DayTopicProps {
  filter: any;
  setFilter: any;
}

const DayTopic = ({ filter, setFilter }: DayTopicProps) => {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField>({
    defaultValues: {
      ...filter,
    },
  });

  return (
    <Grid container spacing={theme.spacing(2)}>
      <Grid item xs={12}>
        <Typography fontSize="18px" fontWeight="bold">
          Choose your date
        </Typography>
      </Grid>
      <AppointmentStep1Form control={control} />
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit((userInput) => setFilter(userInput))}
        >
          시간 고르기
        </Button>
      </Grid>
    </Grid>
  );
};

export default DayTopic;
