import React from "react";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

import ArrayLocalStorage from '../utils/array-local-storage';

function Home() {
  const [typeOrigin, setTypeOrigin] = React.useState("");
  const [numberOrigin, setNumberOrigin] = React.useState("");
  const [yearOrigin, setYearOrigin] = React.useState(new Date());
  const [foundation, setFoundation] = React.useState("");
  const [coordinates, setCoordinates] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [complement, setComplement] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");

  const router = useRouter();

  async function setAddressByCoordinates(lat, lng) {
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}6&lon=${lng}`);

    const address = response.data.address;

    setStreet(address.road || "");
    setNumber(address.house_number || "");
    setDistrict(address.city_district || "");
    setCity(address.city || "");
    setState(address.state || "");
    console.log(response);
  }

  React.useEffect(() => {
    const options = {
      enableHighAccuracy: true,
    };

    navigator.geolocation.getCurrentPosition(function (position) {
      setCoordinates(`lat: ${position.coords.latitude}; long: ${position.coords.longitude}`);
      console.log(position);
      setAddressByCoordinates(position.coords.latitude, position.coords.longitude);
    }, (error) => console.log(error), options);
  }, []);

function registroRep(event) {
    event.preventDefault();
    const rep = {
      id: Date.now(),
      typeOrigin,
      numberOrigin,
      foundation,
      yearOrigin,
      coordinates,
      street,
      number,
      complement,
      district,
      city,
      state,
      flagStatus: 0 // 0: Active, 1: Achieved, 2: Deleted
    };

    ArrayLocalStorage.push("reps", rep);
    toast.success("Rep cadastrada com sucesso!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    router.push('/');
  }

  return <form onSubmit={() => registroRep(event)}>
    <FormControl fullWidth>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12}>
          <Typography variant="body1">
            Origem:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Tipo de Origem"
            value={typeOrigin}
            onChange={e => setTypeOrigin(e.target.value)}
            variant="outlined" fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Número da Origem"
            value={numberOrigin}
            onChange={e => setNumberOrigin(e.target.value)}
            variant="outlined" fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Órgão"
            value={foundation}
            onChange={e => setFoundation(e.target.value)}
            variant="outlined" fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            views={['year']}
            label="Ano da Origem"
            value={yearOrigin}
            onChange={e => setYearOrigin(e.target.value)}
            variant="outlined"
            fullWidth
            renderInput={(params) => <TextField {...params} helperText={null} />}
          />
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12}>
          <Typography variant="body1">
            Local Perícia:
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
            value={complement}setComplement
            onChange={e => setComplement(e.target.value)}
            type="text"
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
      <Grid container sx={{ px: 2, pb: 2 }}>
        <Button variant="contained" size="large" fullWidth type="submit">Cadastrar REP</Button>
      </Grid>
    </FormControl>
  </form>;
}

export default Home;
