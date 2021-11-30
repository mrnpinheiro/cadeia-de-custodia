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
import DeleteIcon from '@mui/icons-material/Delete';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import JSONLocalStorage from '../utils/json-local-storage';

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
            Deseja mesmo deletar esse(s) vestígio(s)?
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
          aria-label="unarchive vestige"
          component="span"
          size="large"
          onClick={props.handleUnarchieve}
        >
          <UnarchiveIcon />
        </IconButton>
      </label>
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="delete vestige"
          component="span"
          size="large"
          onClick={props.handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      </label>
    </Stack>
  );
}

export default function ArchieveVestige() {
  React.useEffect(() => {
    const vestiges = JSONLocalStorage.get("vestiges");
    if (vestiges) {
      setListVestiges(vestiges);
    }
  }, []);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [listVestiges, setListVestiges] = React.useState([]);
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

  const handleUnarchieve = () => {
    const listVestigesCopy = [...listVestiges];
    for (const checked of listCheckeds) {
      listVestigesCopy[checked].flagStatus = 0;
    }

    setListVestiges(listVestigesCopy);
    JSONLocalStorage.add("vestiges", listVestiges);
  };

  function handleDelete() {
    setIsModalOpen(true);
  };

  function deleteRep() {
    const listVestigesCopy = [...listVestiges];
    for (const checked of listCheckeds) {
      listVestigesCopy[checked].flagStatus = 2;
    }

    setListVestiges(listVestigesCopy);
    JSONLocalStorage.add("vestiges", listVestiges);
    setIsModalOpen(false);
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
				Lista de Vestígios Arquivados
      </Typography>
      {
        listCheckeds.length > 0 ? (
          <ActionButtons
            handleUnarchieve={handleUnarchieve}
            handleDelete={handleDelete}
          ></ActionButtons>
        ):(<></>)
      }
      {
        !listVestiges || listVestiges.length === 0 ? (
          <Typography variant="body1" component="h5" gutterBottom>
            &lt; Nenhum vestígio arquivado &gt;
          </Typography>
        ) : (
          <List sx={{
            width: '100%',
            maxWidth: '100%',
            bgcolor: 'background.paper',
          }}>
            {listVestiges.map((value, index) => {
              const labelId = `checkbox-list-label-${value}`;
              if (value.flagStatus === 1) {
                return (
                  <ListItem
                    key={index}
                    alignItems="flex-start"
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
                      <Link href={`/rep/${value.idRep}/vestigio/${value.idVestige}`}>
                        <ListItemText
                          id={labelId}
                          primary={
                            `${value.typeVestige} - ${value.classPiece}`
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
      <AlertDialog isOpen={isModalOpen} setIsOpen={setIsModalOpen} onConfirm={deleteRep}></AlertDialog>
    </Box>
  );
}
