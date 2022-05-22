import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { Brand } from './';

export const getTheme = (brand: Brand) => createTheme({
  palette: {
    primary: {
      main: brand.primaryColor,
    },
    divider: '#e9e9e9',
    secondary: {
      main: brand.secondaryColor,
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
});
