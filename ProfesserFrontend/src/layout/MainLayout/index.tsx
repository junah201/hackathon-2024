import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Header from './Header';

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header />
      <Box
        component="main"
        sx={{
          width: '100%',
          flexGrow: 1,
          p: { xs: 3, sm: 5 },
          justifyContent: 'center',
          display: 'flex',
        }}
        mt="60px"
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
