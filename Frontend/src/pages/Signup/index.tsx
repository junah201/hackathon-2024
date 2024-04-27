import { Button, Grid, Typography, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

import { signup } from '@/api/student';
import SignupForm from '@/components/forms/SignupForm';
import MainCard from '@/components/MainCard';
import { ROUTE } from '@/constants';
import { RegisterField } from '@/constants/form';
import { useCustomMutation } from '@/lib/Query';

const Signup = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField, any>();

  const { mutate, isLoading } = useCustomMutation(signup, {
    onSuccess: () => {
      navigate(ROUTE.LOGIN);
    },
    SuccessMessage: 'Registration success',
    ErrorMessage: 'Registration failed',
  });

  return (
    <MainCard
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '410px',
        gap: theme.spacing(2),
      }}
    >
      <Typography variant="h2" fontWeight="bold" textAlign="center">
        Register
      </Typography>
      <form
        onSubmit={handleSubmit((userInput: RegisterField) => mutate(userInput))}
      >
        <Grid container spacing={2}>
          <SignupForm control={control} />
        </Grid>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting || isLoading}
          color={!Object.keys(errors)[0] ? 'primary' : 'secondary'}
          sx={{
            color: '#ffffff',
            marginTop: '10px',
            borderRadius: '5px',
            fontSize: '20px',
          }}
        >
          Register
        </Button>
        <Typography textAlign="center">
          Already have an account? &nbsp;
          <Link to={ROUTE.LOGIN}>Login</Link>
        </Typography>
      </form>
    </MainCard>
  );
};

export default Signup;
