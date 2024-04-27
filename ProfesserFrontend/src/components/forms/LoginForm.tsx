import { Control } from 'react-hook-form';

import BaseForm from './BaseForm';

import { INPUT, RegisterField } from '@/constants/form';

interface LoginFormProps {
  control: Control<RegisterField, any>;
}

const LoginForm = ({ control }: LoginFormProps) => {
  const fields = [INPUT.EMAIL, INPUT.PASSWORD];

  return <BaseForm fields={fields} control={control} />;
};

export default LoginForm;
