import React from "react";
import { useRouter } from 'next/router';

import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import ArrayLocalStorage from '../../../../utils/array-local-storage';

function viewVestige() {
  const router = useRouter();
  const { id, idVestige } = router.query;
  const idRep = +id;

  const [rep, setRep] = React.useState();
  const [vestige, setVestige] = React.useState();

  React.useEffect(() => {
    if (!idVestige) return;
    const savedVestiges = ArrayLocalStorage.get("vestiges");
    const foundVestige = savedVestiges.find(item => item.idVestige === parseInt(idVestige));
    setVestige(foundVestige);

    const savedReps = ArrayLocalStorage.get("reps");
    const foundRep = savedReps.find(item => item.id === idRep);
    setRep(foundRep);
  }, [idVestige]);

  return vestige ? <>
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={12}>
        <Typography variant="body1">
          <b>Informações da REP vinculada</b>
        </Typography>
        <Typography>
          {`${rep.typeOrigin} - ${rep.numberOrigin} - ${rep.foundation}`}
        </Typography>
      </Grid>
    </Grid>
    <Divider />
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={12}>
        <Typography variant="h5">
          <b>Vestígio</b>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          <b>Tipo de Vestígio:</b> {vestige.typeVestige}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          <b>Classificação da Peça:</b> {vestige.classPiece}
        </Typography>
      </Grid>
    </Grid>
    <Divider />
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={12}>
        <Typography variant="h6">
          <b>Local Vestígio</b>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          {vestige.street}, {vestige.number} {vestige.complement}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          {vestige.district} - {vestige.city} - {vestige.state}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          {vestige.coordinates}
        </Typography>
      </Grid>
    </Grid>
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={12}>
        <Typography variant="h6">
          <b>Fotos e Anexos</b>
        </Typography>
      </Grid>
    </Grid>
    <Divider />
  </> : <></>;
}

export default viewVestige;
