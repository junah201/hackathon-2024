import Professor from './Professor';

import { getAllProfessor } from '@/api';
import MainCard from '@/components/MainCard';
import { QUERY } from '@/constants';
import { useCustomQuery } from '@/lib';

const Professors = () => {
  const { data } = useCustomQuery(
    [QUERY.KEY.ALL_PROFESSOR, { limit: 5 }],
    () => getAllProfessor(0, 5),
    {}
  );

  if (!data?.data)
    return (
      <MainCard>
        <></>
      </MainCard>
    );

  return (
    <MainCard
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      {data?.data.items.map((p) => (
        <Professor professor={p} key={p.id} />
      ))}
    </MainCard>
  );
};

export default Professors;
