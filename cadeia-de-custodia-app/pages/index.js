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

import ArrayLocalStorage from '../utils/array-local-storage';

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

export default function Home() {
  React.useEffect(() => {
    const reps = ArrayLocalStorage.get("reps");
    if (reps) {
      setListReps(reps);
    }
  }, []);

  const [listReps, setListReps] = React.useState([]);
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
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
        !listReps || listReps.length === 0 ? (
          <Typography variant="body1" component="h5" gutterBottom>
            Nenhuma REP cadastrada
          </Typography>
        ) : (
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
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
                        checked={checked.indexOf(value) !== -1}
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
