import * as React from 'react';
import Link from 'next/link';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import SyncIcon from '@mui/icons-material/Sync';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

import ArrayLocalStorage from '../utils/array-local-storage';

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

function ActionButtons(props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
    >
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="archive rep"
          component="span"
          size="large"
          onClick={props.handleArchieve}
        >
          <MoveToInboxIcon />
        </IconButton>
      </label>
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="delete rep"
          component="span"
          size="large"
          onClick={props.handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      </label>
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="synchronize rep"
          component="span"
          size="large"
          onClick={props.handleSynchronize}
        >
          <SyncIcon />
        </IconButton>
      </label>
    </Stack>
  );
}

export default function Home() {
  React.useEffect(() => {
    const reps = ArrayLocalStorage.get("reps");
    if (reps) {
      setListReps(reps);
    }
  }, []);

  const [listReps, setListReps] = React.useState([]);
  const [listCheckeds, setlistCheckeds] = React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = listCheckeds.indexOf(value);
    const newlistCheckeds = [...listCheckeds];

    if (currentIndex === -1) {
      newlistCheckeds.push(value);
    } else {
      newlistCheckeds.splice(currentIndex, 1);
    }

    setlistCheckeds(newlistCheckeds);
  };

  const handleArchieve = () => {
    console.log(listCheckeds)
  };

  const handleDelete = () => {
    console.log(listCheckeds)
  };

  const handleSynchronize = () => {
    console.log(listCheckeds)
  };

  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" component="h5" gutterBottom>
        Lista de REPs Virtuais
      </Typography>
      {
        listCheckeds.length > 0 ? (
          <ActionButtons
            handleArchieve={handleArchieve}
            handleDelete={handleDelete}
            handleSynchronize={handleSynchronize}
          ></ActionButtons>
        ):(<></>)
      }
      {
        !listReps || listReps.length === 0 ? (
          <Typography variant="body1" component="h5" gutterBottom>
            &lt; Nenhuma REP cadastrada &gt;
          </Typography>
        ) : (
          <List sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
              position: 'absolute',
              top: '150px',
              right: '0px'
            }}>
            {listReps.map((value, index) => {
              const labelId = `checkbox-list-label-${value}`;

              return (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                      <CreateIcon />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={listCheckeds.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={`${value.typeOrigin} - ${value.numberOrigin} - ${value.foundation}`}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        )
      }
      <Link href="/cadastro-rep">
        <Fab sx={fabStyle} color='primary'>
          <AddIcon />
        </Fab>
      </Link>
    </Box>
  );
}
