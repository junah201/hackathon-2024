import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from '@mui/material';

interface RawTableProps {
  data: any[];
  headers: string[];
  row: (info: any) => JSX.Element;
}

export const RawTable = ({ data, headers, row }: RawTableProps) => {
  return (
    <TableContainer
      sx={{
        width: '100%',
        overflowX: 'auto',
        position: 'relative',
        display: 'block',
        maxWidth: '100%',
        '& td, & th': { whiteSpace: 'nowrap' },
      }}
    >
      <MuiTable
        sx={{
          '& .MuiTableCell-root:first-of-type': {
            pl: 2,
          },
          '& .MuiTableCell-root:last-of-type': {
            pr: 3,
          },
          '& .MuiTableCell-head': {
            backgroundColor: 'grey.50',
          },
        }}
      >
        <TableHead>
          {headers.map((header: string) => {
            return <TableCell key={header}>{header}</TableCell>;
          })}
        </TableHead>
        <TableBody>{data.map((info) => row(info))}</TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default RawTable;
