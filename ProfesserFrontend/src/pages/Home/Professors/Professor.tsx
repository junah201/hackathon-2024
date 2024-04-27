import { Box, Button, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

import Avatar from '@/components/Avatar';
import { Professor as ProfessorType } from '@/types';

interface ProfessorProps {
  professor: ProfessorType;
}

const Professor = ({ professor }: ProfessorProps) => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        backgroundColor: theme.palette.primary.light,
        padding: theme.spacing(2),
        borderRadius: '10px',
      }}
    >
      <Avatar
        alt={professor.name}
        src={professor.profile}
        sx={{
          width: '100px',
          height: '100px',
        }}
      />
      <Typography fontSize="18px" fontWeight="bold">
        {professor.name}
      </Typography>
      <Box>
        {professor.lectures.map((l) => (
          <Typography fontSize="18px">{l.name}</Typography>
        ))}
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{
          marginTop: theme.spacing(2),
          borderRadius: '5px',
          fontSize: '18px',
        }}
      >
        <Link to={`/professor/${professor.id}`}>Appointment</Link>
      </Button>
    </Box>
  );
};

export default Professor;
