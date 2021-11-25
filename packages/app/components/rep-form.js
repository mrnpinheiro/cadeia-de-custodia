import React from "react";

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

function RepForm({initialValues, onSubmit}) {
  if (!initialValues) {
    initialValues = {};
  }

  const [typeOrigin, setTypeOrigin] = React.useState(initialValues.typeOrigin);
  const [numberOrigin, setNumberOrigin] = React.useState(initialValues.numberOrigin);
  const [yearOrigin, setYearOrigin] = React.useState((initialValues.yearOrigin && new Date(initialValues.yearOrigin)) || new Date());
  const [foundation, setFoundation] = React.useState(initialValues.foundation);
  const [authority, setAuthority] = React.useState(initialValues.authority);
  const [coordinates, setCoordinates] = React.useState(initialValues.coordinates);
  const [street, setStreet] = React.useState(initialValues.street);
  const [number, setNumber] = React.useState(initialValues.number);
  const [complement, setComplement] = React.useState(initialValues.complement);
  const [district, setDistrict] = React.useState(initialValues.district);
  const [city, setCity] = React.useState(initialValues.city);
  const [state, setState] = React.useState(initialValues.state);

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
    if (coordinates) return;

    const options = {
      enableHighAccuracy: true,
    };

    navigator.geolocation.getCurrentPosition(function (position) {
      setCoordinates(`lat: ${position.coords.latitude}; long: ${position.coords.longitude}`);
      console.log(position);
      setAddressByCoordinates(position.coords.latitude, position.coords.longitude);
    }, (error) => console.log(error), options);
  }, []);

  function onSubmitForm(event) {
    event.preventDefault();

    const rep = {
      id: Date.now(),
      typeOrigin,
      numberOrigin,
      foundation,
      authority,
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
    onSubmit(rep);
  }

  return <form onSubmit={(event) => onSubmitForm(event)}>
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
        <Grid item xs={12}>
          <TextField
            label="Órgão"
            value={foundation}
            onChange={e => setFoundation(e.target.value)}
            variant="outlined" fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Autoridade Solicitante"
            value={authority}
            onChange={e => setAuthority(e.target.value)}
            variant="outlined" fullWidth
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
            value={complement}
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
        <Button variant="contained" size="large" fullWidth type="submit">Salvar REP</Button>
      </Grid>
    </FormControl>
  </form>;
}

export default RepForm;
