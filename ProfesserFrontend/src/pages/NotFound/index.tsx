import { Box, Typography, useTheme } from '@mui/material';

const NotFound = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: theme.spacing(2),
        height: '100%',
        width: '100%',
      }}
    >
      <Typography
        variant="h1"
        color={theme.palette.text.secondary}
        sx={{
          fontWeight: 'bold',
          fontSize: '10rem',
        }}
      >
        404
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: '1.5rem',
        }}
      >
        Page not found
      </Typography>
    </Box>
  );
};

export default NotFound;
