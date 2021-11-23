import React from "react";

import Dexie from 'dexie';
import crypto from 'crypto';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';

const Input = styled('input')({
  display: 'none',
});

function VestigeForm({rep, onSubmit}) {
  const [typeVestige, setTypeVestige] = React.useState("");
  const [classPiece, setClassPiece] = React.useState("");
  const [observationVestige, setObservationVestige] = React.useState("");
  const [coordinates, setCoordinates] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [photos, setPhotos] = React.useState([]);
  const [attachments, setAttachments] = React.useState([]);

  React.useEffect(() => {
    if (!rep) return;
    setCoordinates(rep.coordinates);
    setStreet(rep.street);
    setNumber(rep.number);
    setDistrict(rep.district);
    setCity(rep.city);
    setState(rep.state);
  }, [rep]);

  const db = new Dexie("cadeia-de-custodia");

  React.useEffect(
    () => {
      db.version(1).stores({ vestigePhotos: 'id,name,file' });
    },
    [db]
  );

  async function handlePhotosInput(target) {
    if (target.files) {
      if (target.files.length > 0) {
        const photosWithId = [];
        for (const file of target.files) {
          const fileBinary = await new Promise((resolve) => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => resolve(fileReader.result);
            fileReader.readAsDataURL(file);
          });
          photosWithId.push({
            id: crypto.createHash('sha256').update(fileBinary).digest('hex'),
            name: file.name,
            file: file
          });
        }

        setPhotos([...photos, ...photosWithId]);
      }
    }
  }

  async function handleAttachmentsInput(target) {
    if (target.files) {
      if (target.files.length !== 0) {
        const attachmentsWithId = [];
        for (const file of target.files) {
          const fileBinary = await new Promise((resolve) => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => resolve(fileReader.result);
            fileReader.readAsDataURL(file);
          });
          attachmentsWithId.push({
            id: crypto.createHash('sha256').update(fileBinary).digest('hex'),
            name: file.name,
            file: file
          });
        }

        setAttachments([...attachments, ...attachmentsWithId]);
      }
    }
  }

  function handleDeletePhoto(photoId) {
    setPhotos(photos.filter((photo) => {
      return photo.id !== photoId;
    }));
  }

  function handleDeleteAttachment(attachmentId) {
    setAtthandleDeleteAttachments(attachments.filter((attachment) => {
      return attachment.id !== attachmentId;
    }));
  }

  function onSubmitForm(event) {
    event.preventDefault();

    const vestige = {
      idVestige: Date.now(),
      typeVestige,
      classPiece,
      observationVestige,
      coordinates,
      street,
      number,
      district,
      city,
      state,
      photoIds: photos.map((photo) => photo.id),
      attachmentIds: attachments.map((attachment) => attachment.id),
      idRep: rep.id
    };
    onSubmit(vestige);
  }

  return rep ? <form onSubmit={(event) => onSubmitForm(event)}>
    <FormControl fullWidth>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12}>
          <Typography variant="body1">
            Informações da REP vinculada:
          </Typography>
          <Typography>
            {`${rep.typeOrigin} - ${rep.numberOrigin} - ${rep.foundation}`}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12}>
          <Typography variant="body1">
            Vestígio:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="vestige">Tipo de Vestígio</InputLabel>
            <Select
              labelId="vestige"
              id="typeVestige"
              value={typeVestige}
              label="Tipo de Vestígio"
              onChange={e => setTypeVestige(e.target.value)}
            >
              <MenuItem value={"organic"}>Orgânico</MenuItem>
              <MenuItem value={"inorganic"}>Inorgânico</MenuItem>
              <MenuItem value={"others"}>Outros</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Classificação da Peça"
            value={classPiece}
            onChange={e => setClassPiece(e.target.value)}
            variant="outlined" fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Observação"
            multiline
            rows={2}
            value={observationVestige}
            onChange={e => setObservationVestige(e.target.value)}
            variant="outlined" fullWidth
          />
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12}>
          <Typography variant="body1">
            Local do Vestígio:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Rua / Logradouro"
            value={street}
            onChange={e => setStreet(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Nº"
            value={number}
            onChange={e => setNumber(e.target.value)}
            type="number"
            inputProps={{min: 0}}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            label="Complemento"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Bairro"
            value={district}
            onChange={e => setDistrict(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            label="Cidade"
            value={city}
            onChange={e => setCity(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="UF"
            value={state}
            onChange={e => setState(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Lat / Long"
            value={coordinates}
            onChange={e => setCoordinates(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <label htmlFor="icon-button-file">
              <Input
                onChange={e => handlePhotosInput(e.target)}
                type="file"
                accept="image/*"
                capture="environment"
                multiple
                id="icon-button-file"
              />
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
            <label htmlFor="contained-button-file">
              <Input
                onChange={e => handleAttachmentsInput(e.target)}
                id="contained-button-file"
                multiple
                type="file"
              />
              <Button variant="contained" component="span">
              Anexar
              </Button>
            </label>
          </Stack>
        </Grid>
        <Divider />
        { photos && photos.length > 0 &&
          <Grid container spacing={2} sx={{ p: 2 }} >
            {photos.map((photoFile) => {
              return (
                <Grid key={photoFile.id} item xs={12}>
                  <Box display="flex" justifyContent="center" border={1} sx={{
                    width: '100%',
                    height: 300,
                    position: 'relative'
                  }}>
                    <Fab
                      sx={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                      }}
                      size='small'
                      aria-label='Delete'
                      color='inherit'
                      onChange={() => handleDeletePhoto(photoFile.id)}
                    >
                      <DeleteIcon></DeleteIcon>
                    </Fab>
                    <img src={URL.createObjectURL(photoFile.file)} alt={photoFile.file.name}></img>
                  </Box>
                </Grid>
              );
            })
            }
          </Grid>
        }
        { attachments && attachments.length > 0 &&
          <Grid container spacing={2} sx={{ p: 2 }} >
            {attachments.map((attachment, index) => {
              return (
                <Grid key={index} item xs={12}>
                  <a
                    href={URL.createObjectURL(attachment.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Box display="flex" border={1} sx={{
                      width: '100%',
                      height: 300,
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}>
                      <Fab
                        sx={{
                          position: 'absolute',
                          top: 5,
                          right: 5,
                        }}
                        size='small'
                        aria-label='Delete'
                        color='inherit'
                        onChange={() => handleDeleteAttachment(photoFile.id)}
                      >
                        <DeleteIcon></DeleteIcon>
                      </Fab>
                      <InsertDriveFileIcon/>
                      <Typography>
                        {attachment.name}
                      </Typography>
                    </Box>
                  </a>
                </Grid>
              );
            })
            }
          </Grid>
        }
      </Grid>
      <Grid container sx={{ px: 2, pb: 2 }}>
        <Button
          variant="contained"
          size="large"
          fullWidth
          type="submit">
          Cadastrar Vestígio
        </Button>
      </Grid>
    </FormControl>
  </form> : <></>;
}

export default VestigeForm;
