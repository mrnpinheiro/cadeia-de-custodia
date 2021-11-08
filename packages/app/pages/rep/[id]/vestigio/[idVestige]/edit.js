import React from "react";
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrayLocalStorage from '../../../../../utils/array-local-storage';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import JSONLocalStorage from '../../../../../utils/json-local-storage';

const Input = styled('input')({
  display: 'none',
});


function CadastroVestigio() {
  const router = useRouter();
  const { id } = router.query;
  const idRep = +id;

  React.useEffect(() => {
    if (!idRep) return;
    const reps = JSONLocalStorage.get("reps");
    const foundRep = reps.find(item => item.id === idRep);
    setRep(foundRep);
    setCoordinates(foundRep.coordinates);
    setStreet(foundRep.street);
    setNumber(foundRep.number);
    setDistrict(foundRep.district);
    setCity(foundRep.city);
    setState(foundRep.state);
  }, [idRep]);

  const [rep, setRep] = React.useState();
  const [typeVestige, setTypeVestige] = React.useState("");
  const [classPiece, setClassPiece] = React.useState("");
  const [coordinates, setCoordinates] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [photo, setPhoto] = React.useState("");
  const [file, setFile] = React.useState("");

  function registerVestige(event) {
    event.preventDefault();
    const vestige = {
      idVestige: Date.now(),
      typeVestige,
      classPiece,
      coordinates,
      street,
      number,
      district,
      city,
      state,
      photo,
      file,
      idRep
    };

    ArrayLocalStorage.push("vestiges", vestige);
    toast.success("Vestígio cadastrado com sucesso!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    router.push(`/rep/${idRep}`);
  }

  return rep ? <form onSubmit={(event) => registerVestige(event)}>
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
          <Typography variant="body1">
            Fotos e anexos:
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <label htmlFor="icon-button-file">
              <Input
                value={photo}
                onChange={e => setPhoto(e.target.value)}
                accept="image/*"
                id="icon-button-file"
                type="file" />
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
            <label htmlFor="contained-button-file">
              <Input
                value={file}
                onChange={e => setFile(e.target.value)}
                accept="image/*"
                id="contained-button-file"
                multiple type="file" />
              <Button variant="contained" component="span">
              Anexar
              </Button>
            </label>
          </Stack>
        </Grid>
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

export default CadastroVestigio;
