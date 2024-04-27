import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import { Box, Typography, useTheme } from '@mui/material';

import { getProfessorById } from '@/api';
import Avatar from '@/components/Avatar';
import { QUERY } from '@/constants';
import { useCustomQuery } from '@/lib';

interface ProfessorInfoProps {
  id: number | string;
}

const ProfessorInfo = ({ id }: ProfessorInfoProps) => {
  const theme = useTheme();
  const { data } = useCustomQuery(
    [QUERY.KEY.PROFESSOR, { id }],
    () => getProfessorById(id),
    {}
  );

  if (!data?.data) return <></>;

  const p = data?.data;

  return (
    <Box display="flex" flexDirection="column" gap={theme.spacing(2)}>
      <Typography fontSize="18px" fontWeight="bold">
        Professor Info
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={theme.spacing(2)}
      >
        <Avatar
          alt={p.name}
          src={p.profile}
          sx={{
            width: '100px',
            height: '100px',
          }}
        />
        <Typography fontSize="24px" fontWeight="bold">
          {p.name}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={theme.spacing(2)}>
        <EmailOutlinedIcon />
        <Typography fontSize="16px" fontWeight="bold">
          {p.email}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={theme.spacing(2)}>
        <FmdGoodOutlinedIcon />
        <Typography fontSize="16px" fontWeight="bold">
          {p.office}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={theme.spacing(2)}>
        <StarBorderPurple500OutlinedIcon />
        <Typography fontSize="16px" fontWeight="bold">
          {p.major}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfessorInfo;
