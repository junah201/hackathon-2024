import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import MySchedule from './MySchedule';
import Search from './Search';

const Home = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={theme.spacing(2)}>
      <Grid item xs={3.5}>
        <MySchedule />
      </Grid>
      <Grid item xs={8.5}>
        <Search />
      </Grid>
    </Grid>
  );
};

export default Home;
