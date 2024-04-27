import { API_ROUTE } from '@/constants';
import { Axios } from '@/lib';
import { Student, StudentCreate } from '@/types';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

interface AuthInfo {
  email: string;
  password: string;
}

export const login = async ({ email, password }: AuthInfo) => {
  const res = await unAuthAxios.postFormUnlencoded(API_ROUTE.AUTH.LOG_IN, {
    username: email,
    password: password,
  });

  return res;
};

export const signup = async (data: StudentCreate) => {
  const res = await unAuthAxios.post(API_ROUTE.AUTH.SIGN_UP, data);

  return res;
};

export const getMe = async () => {
  const res = await authAxios.get<Student>(API_ROUTE.AUTH.ME);

  return res;
};
