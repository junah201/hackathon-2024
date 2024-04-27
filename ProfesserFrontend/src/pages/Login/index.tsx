import { Button, Grid, Typography, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

import { login } from '@/api/professor';
import LoginForm from '@/components/forms/LoginForm';
import MainCard from '@/components/MainCard';
import { ROUTE, ACCESS_TOKEN } from '@/constants';
import { RegisterField } from '@/constants/form';
import { setCookie, useCustomMutation } from '@/lib';

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField, any>();

  const { mutate, isLoading } = useCustomMutation(login, {
    SuccessMessage: 'Login success',
    onSuccess: (res) => {
      setCookie(ACCESS_TOKEN.key, res.data.access_token, {
        expires: new Date(Date.now() + 30 * 60 * 1000),
      });
      navigate(ROUTE.HOME);
    },
    ErrorMessage: 'Login failed',
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
        Login
      </Typography>
      <form
        onSubmit={handleSubmit((userInput: RegisterField) => mutate(userInput))}
      >
        <Grid container spacing={2}>
          <LoginForm control={control} />
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
          Login
        </Button>
        <Typography textAlign="center">
          <Link to={ROUTE.SIGN_UP}>Register</Link>
        </Typography>
      </form>
    </MainCard>
  );
};

export default Login;
