import { Toolbar, AppBar } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import HeaderContent from './HeaderContent';

const AppBarStyled = styled(
  AppBar,
  {}
)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: `100%`,
}));

const Header = () => {
  const theme = useTheme();

  return (
    <>
      <AppBarStyled
        position="fixed"
        elevation={0}
        sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar>
          <HeaderContent />
        </Toolbar>
      </AppBarStyled>
    </>
  );
};

export default Header;
