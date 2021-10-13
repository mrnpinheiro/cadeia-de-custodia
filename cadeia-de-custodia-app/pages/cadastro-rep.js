import React from "react";

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

function Home() {
  const [coordinates, setCoordinates] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");

  async function a(lat, lng) {
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
      a(position.coords.latitude, position.coords.longitude);
    }, (error) => console.log(error), options);
  }, []);

function registroRep(event) {
    event.preventDefault()
    const rep = {
      coordinates,
      street,
      number,
      district,
      city,
      state
    }
    const repStr = JSON.stringify(rep)
    console.log(repStr)
    localStorage.setItem("rep", repStr)
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
          <TextField label="Nº B.O." variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="[N°]  D.P. - [Cidade]" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Nº IP/PM" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            views={['year']}
            label="Ano"
            variant="outlined"
            fullWidth
            onChange={(newValue) => {
              setValue(newValue);
            }}
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
