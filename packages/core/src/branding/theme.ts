import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { Brand } from '../plugin/branding';

export const getTheme = (brand: Brand) => createTheme({
  palette: {
    primary: {
      main: brand.primaryColor,
    },
    secondary: {
      main: brand.secondaryColor,
    },
    error: {
      main: red.A400,
    },
  },
});
