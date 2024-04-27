import dayjs from 'dayjs';
import { UseFormRegister } from 'react-hook-form';

export interface FormRules<RegisterField = any> {
  required?: string;
  min?: {
    value: number | string;
    message: string;
  };
  max?: {
    value: number | string;
    message: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
  validate?: (input: string, values: RegisterField) => boolean | string;
}

export interface Option {
  label: string;
  value: any;
}

export const INPUT_TYPE = Object.freeze({
  TEXT: 'text',
  PASSWORD: 'password',
  NUMBER: 'number',
  DATE: 'date',
  RADIO: 'radio',
  MULTILINE: 'textarea',
  FILE: 'file',
  SELECT: 'select',
  CHECKBOX: 'checkbox',
});

type InputSchema = typeof INPUT_TYPE;
type InputKeys = keyof typeof INPUT_TYPE;
export type InputTypes = InputSchema[InputKeys];

export const INPUT = Object.freeze({
  EMAIL: Object.freeze({
    name: 'email',
    label: 'Email',
    type: INPUT_TYPE.TEXT,
    placeholder: 'name@domain.com',
    helperText: 'Enter your email',
    disabled: false,
    rules: {
      required: 'Please enter your email',
      pattern: {
        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: 'Invalid email format',
      },
    },
  }),
  PASSWORD: Object.freeze({
    name: 'password',
    label: 'Password',
    type: INPUT_TYPE.PASSWORD,
    placeholder: '********',
    helperText: 'Enter password',
    disabled: false,
    rules: {
      required: 'Please enter password',
      minLength: {
        value: 6,
        message: 'Password should be same or longer than 8 letters',
      },
      maxLength: {
        value: 100,
        message: 'Password should be same or less than 100 letters',
      },
    },
  }),
  CONFIRM_PASSWORD: Object.freeze({
    name: 'confirmPassword',
    label: 'Password Confirmation',
    type: INPUT_TYPE.PASSWORD,
    placeholder: '12345678',
    helperText: 'Enter your password again',
    disabled: false,
    rules: {
      required: 'Please enter your password',
      validate: (input: string, values: Record<string, any>) => {
        const password = values['password'];

        return input === password || 'Password does not match';
      },
    },
  }),
  NAME: Object.freeze({
    name: 'name',
    label: 'name',
    type: INPUT_TYPE.TEXT,
    placeholder: 'Gildong, Hong',
    helperText: 'Enter your name',
    disabled: false,
    rules: {
      required: 'Please enter your name',
    },
  }),
  SEARCH: Object.freeze({
    name: 'search',
    label: '',
    type: INPUT_TYPE.TEXT,
    placeholder: 'Search for professor name / course name',
    helperText: '',
    disabled: false,
    rules: {},
  }),
  APPOINTMENT_DATE: Object.freeze({
    name: 'date',
    label: 'Date',
    type: INPUT_TYPE.DATE,
    placeholder: '',
    helperText: 'Select appointment date',
    disabled: false,
    rules: {
      required: 'Please select appointment date',
      min: {
        value: dayjs().format('YYYY-MM-DD'),
        message: 'Please select date after today',
      },
    },
  }),
  APPOINTMENT_TOPIC: Object.freeze({
    name: 'topic',
    label: 'Topic',
    type: INPUT_TYPE.TEXT,
    placeholder: 'Topic',
    helperText: 'Enter appointment topic',
    disabled: false,
    rules: {
      required: 'Please enter appointment topic',
    },
  }),
});

export type RegisterTypes = (typeof INPUT)[keyof typeof INPUT]['name'];
export type RegisterField = Record<RegisterTypes, any>;
export type RegisterForm = UseFormRegister<RegisterField>;

export interface FormInputType {
  name: RegisterTypes;
  label: string;
  type: InputTypes;
  placeholder: string;
  helperText: string;
  disabled: boolean;
  rules: FormRules;
}
