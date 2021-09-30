import "../styles/globals.css";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const theme = createTheme({
  palette: {
    primary: {
      main: '#303030',
    },
    secondary: {
      main: '#edf2ff',
    },
  },
});

function MyApp({ Component, pageProps }) {
  return <LocalizationProvider dateAdapter={AdapterDateFns}>
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Cadeia de Custódia
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Component {...pageProps} />
    </ThemeProvider>
  </LocalizationProvider>;
}

export default MyApp;
