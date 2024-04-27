import { API_ROUTE } from '@/constants';
import { Axios } from '@/lib';
import { Professor, ProfessorList } from '@/types';

const authAxios = new Axios(true);

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
