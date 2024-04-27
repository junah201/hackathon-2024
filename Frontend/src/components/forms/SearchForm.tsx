import { Control } from 'react-hook-form';

import BaseForm from './BaseForm';

import { INPUT, RegisterField } from '@/constants/form';

interface SearchFormProps {
  control: Control<RegisterField, any>;
}

export const SearchForm = ({ control }: SearchFormProps) => {
  const fields = [INPUT.SEARCH];

  return <BaseForm fields={fields} control={control} />;
};

export default SearchForm;
