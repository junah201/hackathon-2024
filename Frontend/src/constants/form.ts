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
  FILES: 'files',
});

type InputSchema = typeof INPUT_TYPE;
type InputKeys = keyof typeof INPUT_TYPE;
export type InputTypes = InputSchema[InputKeys];

export const INPUT = Object.freeze({
  EMAIL: Object.freeze({
    name: 'email',
    label: '이메일',
    type: INPUT_TYPE.TEXT,
    placeholder: 'name@domain.com',
    helperText: '이메일 주소를 입력해주세요',
    disabled: false,
    rules: {
      required: '이메일을 입력해주세요',
      pattern: {
        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: '이메일 형식이 올바르지 않습니다',
      },
    },
  }),
  PASSWORD: Object.freeze({
    name: 'password',
    label: '비밀번호',
    type: INPUT_TYPE.PASSWORD,
    placeholder: '비밀번호를 입력해주세요',
    helperText: '비밀번호를 입력해주세요',
    disabled: false,
    rules: {
      required: '비밀번호를 입력해주세요',
      minLength: {
        value: 8,
        message: '비밀번호는 8자 이상 입력해주세요',
      },
      maxLength: {
        value: 100,
        message: '비밀번호는 100자 이하로 입력해주세요',
      },
    },
  }),
  CONFIRM_PASSWORD: Object.freeze({
    name: 'confirmPassword',
    label: '비밀번호 확인',
    type: INPUT_TYPE.PASSWORD,
    placeholder: '비밀번호를 다시 입력해주세요',
    helperText: '비밀번호를 다시 입력해주세요',
    disabled: false,
    rules: {
      required: '비밀번호를 다시 입력해주세요',
      validate: (input: string, values: Record<string, any>) => {
        const password = values['password'];

        return input === password || '비밀번호가 일치하지 않습니다.';
      },
    },
  }),
  NAME: Object.freeze({
    name: 'name',
    label: '이름',
    type: INPUT_TYPE.TEXT,
    placeholder: '홍길동',
    helperText: '이름을 입력해주세요',
    disabled: false,
    rules: {
      required: '이름을 입력해주세요',
    },
  }),
  PHONE: Object.freeze({
    name: 'phone',
    label: '전화번호',
    type: INPUT_TYPE.TEXT,
    placeholder: '01012345678',
    helperText: '전화번호를 입력해주세요',
    disabled: false,
    rules: {
      required: '전화번호를 입력해주세요',
      pattern: {
        value: /^\d+$/,
        message: '전화번호는 숫자로만 입력해주세요',
      },
      minLength: {
        value: 3,
        message: '전화번호가 너무 짧습니다',
      },
      maxLength: {
        value: 100,
        message: '전화번호가 너무 깁니다',
      },
    },
  }),
  BIRTH: Object.freeze({
    name: 'birth',
    label: '생년월일',
    type: INPUT_TYPE.DATE,
    placeholder: '생년월일을 입력해주세요',
    helperText: '생년월일을 입력해주세요',
    disabled: false,
    rules: {
      required: '생년월일을 입력해주세요',
    },
  }),
});

export type RegisterTypes = (typeof INPUT)[keyof typeof INPUT]['name'];
export type RegisterField = Record<RegisterTypes, any>;
export type RegisterForm = UseFormRegister<RegisterField>;
