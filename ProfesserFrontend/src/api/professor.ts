import { API_ROUTE } from '@/constants';
import { Axios } from '@/lib';
import { Professor, ProfessorCreate, ProfessorList } from '@/types';

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

export const signup = async (data: ProfessorCreate) => {
  const res = await unAuthAxios.post(API_ROUTE.AUTH.SIGN_UP, data);

  return res;
};

export const getAllProfessor = async (
  skip: number,
  limit: number,
  query: string = ''
) => {
  const res = await authAxios.getByParams<ProfessorList>(
    API_ROUTE.PROFESSOR.GET_ALL,
    {
      skip: skip,
      limit: limit,
      query: query,
    }
  );

  return res;
};

export const getProfessorById = async (id: number | string) => {
  const res = await authAxios.get<Professor>(API_ROUTE.PROFESSOR.GET_BY_ID(id));

  return res;
};
