import { createTheme } from '@mui/material/styles';

export const Palette = () => {
  return createTheme({
    palette: {
      common: {
        white: '#fff',
        black: '#000',
      },
      primary: {
        main: '#90CAF9',
        dark: '#42A5F5',
        light: '#DEF0FE',
        contrastText: 'rgba(0, 0, 0, 0.87)',
      },
      secondary: {
        main: '#D9D9D9',
        // main: '#ffffff',
      },
      // text: {
      //   primary: '#dfe2ea',
      //   secondary: '#c9cedc',
      //   disabled: '#c9cedc',
      // },
      background: {
        // paper: '#dfe2ea',
        paper: '#ffffff',
        default: '#ffffff',
      },
    },
  });
};

export default Palette;
