import "../styles/globals.css";
import * as React from 'react';
import Link from 'next/link';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const sidebarItems = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Cadastro de REP',
    path: '/rep/cadastro',
  },
  {
    name: 'Arquivo de REP',
    path: '/arquivo-rep',
  },
  {
    name: 'Arquivo de Vestígio',
    path: '/arquivo-vestigio',
  }
];

function MyApp({ Component, pageProps }) {
  const [sidebarIsOpen, setSidebarIsOpen] = React.useState(false);

  const sidebar = () => (
    <Box
      sx={{ width: 250 }}
      onClick={() => setSidebarIsOpen(false)}
      onKeyDown={() => setSidebarIsOpen(false)}
    >
      <List>
        {sidebarItems.map((menuItem, index) => (
          <Link href={menuItem.path} key={index}>
            <ListItem button>
              <ListItemText primary={menuItem.name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return <LocalizationProvider dateAdapter={AdapterDateFns}>
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton onClick={() => setSidebarIsOpen(!sidebarIsOpen)} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Cadeia de Custódia
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        open={sidebarIsOpen}
        onClose={() => setSidebarIsOpen(!sidebarIsOpen)}
      >
        {sidebar()}
      </Drawer>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Component {...pageProps} />
    </ThemeProvider>
  </LocalizationProvider>;
}

export default MyApp;
