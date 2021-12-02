import React from "react";
import { useRouter } from 'next/router';

import Dexie from 'dexie';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Typography from '@mui/material/Typography';

import ArrayLocalStorage from '../../../../utils/array-local-storage';

function viewVestige() {
  const router = useRouter();
  const { id, idVestige } = router.query;
  const idRep = +id;

  const [rep, setRep] = React.useState();
  const [vestige, setVestige] = React.useState();
  const [photos, setPhotos] = React.useState([]);
  const [attachments, setAttachments] = React.useState([]);  

  const db = new Dexie("cadeia-de-custodia");

  React.useEffect(
    () => {
      db.version(1).stores({ 
        vestigePhotos: '++id,hash,name,file',
        vestigeAttachments: '++id,hash,name,file'
      });
    },
    [db]
  );

  React.useEffect(async () => {
    if (!idVestige || !db) return;
    const savedVestiges = ArrayLocalStorage.get("vestiges");
    const foundVestige = savedVestiges.find(item => item.idVestige === parseInt(idVestige));
    setVestige(foundVestige);
    setPhotos(await db.vestigePhotos.bulkGet(foundVestige.photoIds));
    setAttachments(await db.vestigeAttachments.bulkGet(foundVestige.attachmentIds));

    const savedReps = ArrayLocalStorage.get("reps");
    const foundRep = savedReps.find(item => item.id === idRep);
    setRep(foundRep);
  }, [idVestige]);

  return vestige && rep ? <>
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
      { photos && photos.length > 0 &&
        <Grid container spacing={2} sx={{ p: 2 }} >
          {photos.map((photoFile) => {
            return (
              <Grid key={photoFile.id} item xs={12}>
                <Box display="flex" justifyContent="center" border={1} sx={{
                  width: '100%',
                  height: 'auto',
                  position: 'relative'
                }}>
                  <img style={{width: '100%', maxWidth: '100%', height: 'auto'}} src={URL.createObjectURL(photoFile.file)} alt={photoFile.file.name}></img>
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
    <Divider />
  </> : <></>;
}

export default viewVestige;
