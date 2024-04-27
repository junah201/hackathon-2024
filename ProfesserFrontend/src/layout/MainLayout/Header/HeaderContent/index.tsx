import { MenuOutlined } from '@mui/icons-material';
import { Box, Button, IconButton, List, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import LogoSection from '@/components/Logo';
import { ACCESS_TOKEN, ROUTE } from '@/constants';
import { getCookie } from '@/lib';

const HeaderContent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const token = getCookie(ACCESS_TOKEN.key);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'right',
      }}
    >
      {/* <LogoSection /> */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Button variant="contained">
          {!token ? (
            <Link to={ROUTE.LOGIN}>Login</Link>
          ) : (
            <Link to={ROUTE.LOGOUT}>Logout</Link>
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default HeaderContent;
