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
import Stack from '@mui/material/Stack';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import SyncIcon from '@mui/icons-material/Sync';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import JSONLocalStorage from '../utils/json-local-storage';
import TYPE_ORIGIN from '../constants/tipoOrigem';
import ORGAOS from '../constants/orgaos';

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

function AlertDialog({isOpen, setIsOpen, onConfirm}) {
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="body1">
            Deseja mesmo deletar essas REPs?
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>Não</Button>
          <Button onClick={() => onConfirm()} autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

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
    const reps = JSONLocalStorage.get("reps");
    if (reps) {
      setListReps(reps);
    }
  }, []);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [listReps, setListReps] = React.useState([]);
  const [listCheckeds, setlistCheckeds] = React.useState([]);

  function handleToggle(selectedIndex) {
    const newlistCheckeds = [...listCheckeds];

    if (!newlistCheckeds.includes(selectedIndex)) {
      newlistCheckeds.push(selectedIndex);
    } else {
      // Remove select index from checked list
      newlistCheckeds.splice(newlistCheckeds.indexOf(selectedIndex), 1);
    }

    setlistCheckeds(newlistCheckeds);
  };

  const handleArchieve = () => {
    const listRepsCopy = [...listReps];
    for (const checked of listCheckeds) {
      listRepsCopy[checked].flagStatus = 1;
    }

    setListReps(listRepsCopy);
    JSONLocalStorage.add("reps", listReps);
  };

  function handleDelete() {
    setIsModalOpen(true);
  };

  function deleteRep() {
    const listRepsCopy = [...listReps];
    for (const checked of listCheckeds) {
      listRepsCopy[checked].flagStatus = 2;
    }

    setListReps(listRepsCopy);
    JSONLocalStorage.add("reps", listReps);
    setIsModalOpen(false);
  };

  function handleSynchronize() {
    alert('Não implementado');
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
            maxWidth: '100%',
            bgcolor: 'background.paper',
          }}>
            {listReps.map((value, index) => {
              const labelId = `checkbox-list-label-${value}`;
              if (value.flagStatus === 0) {
                return (
                  <ListItem
                    key={index}
                    alignItems="flex-start"
                    secondaryAction={
                      <IconButton edge="end" aria-label="comments">
                        <Link href={`/rep/${value.id}/edit`}>
                          <CreateIcon />
                        </ Link>
                      </IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton onClick={() => handleToggle(index)} dense>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={listCheckeds.includes(index)}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemIcon>
                      <Link href={`/rep/${value.id}`}>
                        <ListItemText
                          id={labelId}
                          primary={
                            `${TYPE_ORIGIN[value.typeOrigin]} - ${value.numberOrigin} - ${ORGAOS[value.foundation]}`
                          }
                        />
                      </Link>
                    </ListItemButton>
                  </ListItem>
                );
              }
            })}
          </List>
        )
      }
      <Link href="/rep/cadastro">
        <Fab sx={fabStyle} color='primary'>
          <AddIcon />
        </Fab>
      </Link>
      <AlertDialog isOpen={isModalOpen} setIsOpen={setIsModalOpen} onConfirm={deleteRep}></AlertDialog>
    </Box>
  );
}
