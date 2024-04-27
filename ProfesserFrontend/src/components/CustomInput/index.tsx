import { Box } from '@mui/material';
import { useController, Control } from 'react-hook-form';

import {
  DateInput,
  MultilineInput,
  PasswordInput,
  RadioInput,
  TextInput,
  NumberInput,
  SelectInput,
} from './form';

import {
  FormRules,
  Option,
  InputTypes,
  INPUT_TYPE,
  RegisterTypes,
} from '@/constants/form';

interface InitInputProps {
  name: RegisterTypes;
  label: string;
  type: InputTypes;
  placeholder?: string;
  helperText?: string;
  options?: Option[];
  disabled?: boolean;
}

interface BasicInputProps extends InitInputProps {
  value: any;
  onChange: (...event: any[]) => void;
  errorMessage?: string | undefined;
}

interface ControlInputProps extends InitInputProps {
  rules?: FormRules;
  control: Control<any, any>;
}

export const BasicInput = ({
  name,
  label,
  type,
  value,
  onChange,
  placeholder = '',
  helperText = ' ',
  errorMessage = '',
  disabled = false,
  options = [],
}: BasicInputProps) => {
  const content = (inputType: InputTypes) => {
    switch (inputType) {
      case INPUT_TYPE.TEXT:
        return (
          <TextInput
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            placeholader={placeholder}
            errorMessage={errorMessage}
            helperText={helperText}
            disabled={disabled}
          />
        );
      case INPUT_TYPE.PASSWORD:
        return (
          <PasswordInput
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            errorMessage={errorMessage}
            helperText={helperText}
            disabled={disabled}
          />
        );
      case INPUT_TYPE.NUMBER:
        return (
          <NumberInput
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            errorMessage={errorMessage}
            helperText={helperText}
            placeholader={placeholder}
            disabled={disabled}
          />
        );
      case INPUT_TYPE.DATE:
        return (
          <DateInput
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            errorMessage={errorMessage}
            helperText={helperText}
            disabled={disabled}
          />
        );
      case INPUT_TYPE.RADIO:
        return (
          <RadioInput
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            errorMessage={errorMessage}
            helperText={helperText}
            options={options}
            disabled={disabled}
          />
        );
      case INPUT_TYPE.MULTILINE:
        return (
          <MultilineInput
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            placeholader={placeholder}
            errorMessage={errorMessage}
            helperText={helperText}
            disabled={disabled}
          />
        );
      case INPUT_TYPE.SELECT:
        return (
          <SelectInput
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            errorMessage={errorMessage}
            helperText={helperText}
            options={options}
            disabled={disabled}
          />
        );
      case INPUT_TYPE.CHECKBOX:
        return <></>;
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {content(type)}
    </Box>
  );
};

export const ControlInput = ({
  name,
  label,
  rules = {},
  type,
  control,
  placeholder = '',
  helperText = ' ',
  options = [],
  disabled = false,
}: ControlInputProps) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    rules,
    control,
  });

  return (
    <BasicInput
      name={name}
      label={`${label} ${rules?.required ? '*' : ''}`}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      helperText={helperText}
      errorMessage={error?.message}
      disabled={disabled}
      options={options}
    />
  );
};
