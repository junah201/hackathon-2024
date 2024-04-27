import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';

import { ControlInput } from '@/components/CustomInput';
import { RegisterField, FormInputType } from '@/constants/form';

interface BaseFormProps {
  control: Control<RegisterField, any>;
  fields: FormInputType[];
}

const BaseForm = ({ control, fields }: BaseFormProps) => {
  return (
    <>
      {fields.map((field) => (
        <Grid item xs={12} key={field.name}>
          <ControlInput control={control} {...field} />
        </Grid>
      ))}
    </>
  );
};

export default BaseForm;
