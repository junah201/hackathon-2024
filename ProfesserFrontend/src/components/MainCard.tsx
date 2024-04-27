import { Box, useTheme } from '@mui/material';

interface MainCardProps {
  children: React.ReactNode;
  sx?: object;
  gap?: number | string;
}

export const MainCard = ({ children, sx = {}, gap }: MainCardProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: '20px',
        borderRadius: theme.spacing(1.5),
        border: `1px solid ${theme.palette.secondary.main}`,
        ...sx,
      }}
      gap={gap}
    >
      {children}
    </Box>
  );
};

export default MainCard;
