import { SnackbarProvider as NotistackSnackbarProvider } from 'notistack';
export { useSnackbar } from 'notistack';

export const SnackbarProvider: React.FC = ({ children }) => (
  <NotistackSnackbarProvider maxSnack={ 5 }>
    { children }
  </NotistackSnackbarProvider>
)