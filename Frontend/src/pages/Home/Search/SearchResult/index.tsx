import { Box, Button, Chip, Typography, useTheme } from '@mui/material';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { getAllProfessor } from '@/api';
import Avatar from '@/components/Avatar';
import { Table } from '@/components/Table';
import { QUERY } from '@/constants';
import { Leature, Professor } from '@/types';

interface SearchResultProps {
  filter: any; // TODO : add type
}

const SearchResult = ({ filter }: SearchResultProps) => {
  const theme = useTheme();

  const columns = useMemo<ColumnDef<Professor, any>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: (info) => {
          return <Typography align="left">{`${info.getValue()}`}</Typography>;
        },
      },
      {
        id: 'professor',
        accessorFn: (row) => row,
        header: 'professor',
        cell: (info: CellContext<Professor, Professor>) => {
          const p = info.getValue();
          return (
            <Box display="flex" alignItems="center" gap={theme.spacing(2)}>
              <Avatar alt={p.name} src={p.profile} />
              <Typography fontSize="18px">{p.name}</Typography>
            </Box>
          );
        },
      },
      {
        id: 'major',
        accessorFn: (row) => row.major,
        header: 'major',
        cell: (info: CellContext<Professor, string>) => {
          const l = info.getValue();
          return <Typography fontSize="18px">{l}</Typography>;
        },
      },
      {
        id: 'lectures',
        accessorFn: (row) => row.lectures,
        header: 'lectures',
        cell: (info: CellContext<Professor, Leature[]>) => {
          const l = info.getValue();
          return (
            <Box display="flex" gap={theme.spacing(2)}>
              {l.map((lecture) => (
                <Chip label={lecture.name} key={lecture.name} />
              ))}
            </Box>
          );
        },
      },
      {
        id: 'detail',
        accessorKey: 'id',
        header: 'Appointment',
        cell: (info: CellContext<Professor, number>) => {
          const id = info.getValue();
          return (
            <Link to={`/appointment/${id}`}>
              <Button variant="contained">Appointment</Button>
            </Link>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <Table
        size={20}
        queryKey={QUERY.KEY.ALL_PROFESSOR}
        queryDetail={{
          query: filter,
        }}
        queryFn={(page, size) => getAllProfessor(page, size, filter)}
        columns={columns}
      />
    </>
  );
};

export default SearchResult;
