import { Control } from 'react-hook-form';

import BaseForm from './BaseForm';

import { INPUT, RegisterField } from '@/constants/form';

interface AppointmentStep1FormProps {
  control: Control<RegisterField, any>;
}

export const AppointmentStep1Form = ({
  control,
}: AppointmentStep1FormProps) => {
  const fields = [INPUT.APPOINTMENT_TOPIC, INPUT.APPOINTMENT_DATE];

  return <BaseForm fields={fields} control={control} />;
};

export default AppointmentStep1Form;
