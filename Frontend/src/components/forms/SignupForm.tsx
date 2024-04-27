import { Control } from 'react-hook-form';

import BaseForm from './BaseForm';

import { INPUT, RegisterField } from '@/constants/form';

interface SignupFormProps {
  control: Control<RegisterField, any>;
}

const SignupForm = ({ control }: SignupFormProps) => {
  const fields = [
    INPUT.NAME,
    INPUT.EMAIL,
    INPUT.PASSWORD,
    INPUT.CONFIRM_PASSWORD,
  ];

  return <BaseForm fields={fields} control={control} />;
};

export default SignupForm;
