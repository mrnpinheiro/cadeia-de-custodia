import React from "react";
import { useRouter } from 'next/router';

import Dexie from 'dexie';
import { toast } from 'react-toastify';

import VestigeForm from '../../../../../components/vestige-form';
import ArrayLocalStorage from '../../../../../utils/array-local-storage';
import JSONLocalStorage from '../../../../../utils/json-local-storage';

function EditVestige() {
  const router = useRouter();
  const { id } = router.query;
  const idRep = +id;
  const idVestige = +(router.query.idVestige);

  const [rep, setRep] = React.useState();
  const [vestige, setVestige] = React.useState();
  const [vestigeIndex, setVestigeIndex] = React.useState();

  const db = new Dexie("cadeia-de-custodia");
  db.version(1).stores({ 
    vestigePhotos: '++id,hash,name,file',
    vestigeAttachments: '++id,hash,name,file'
  });

  React.useEffect(async () => {
    if (!idRep || !idVestige) return;
    
    const reps = JSONLocalStorage.get("reps");
    const foundRep = reps.find(item => item.id === idRep);
    setRep(foundRep);
    const vestiges = ArrayLocalStorage.get("vestiges");
    const foundVestige = vestiges.find(item => item.idVestige === idVestige);
    const foundVestigeIndex = vestiges.findIndex(item => item.idVestige === idVestige);
    const photos = await db.vestigePhotos.bulkGet(foundVestige.photoIds);
    const attachments = await db.vestigeAttachments.bulkGet(foundVestige.attachmentIds);
    setVestige({...foundVestige, photos, attachments});
    setVestigeIndex(foundVestigeIndex);
  }, [idRep, idVestige]);

  async function editVestige(editedVestige) {
    let photoIds = [];
    if (editedVestige.photos) {
      console.log(db);
      console.log(db.vestigePhotos);
      await db.vestigePhotos.bulkDelete(vestige.photoIds);
      photoIds  = await db.vestigePhotos.bulkAdd(editedVestige.photos, {allKeys: true});
    }
    let attachmentIds = [];
    if (editedVestige.attachments) {
      await db.vestigeAttachments.bulkDelete(vestige.attachmentIds);
      attachmentIds = await db.vestigePhotos.bulkAdd(editedVestige.attachments, {allKeys: true});
    }

    ArrayLocalStorage.update("vestiges", vestigeIndex, formatVestigeWithPhotoIdsAndAttachmentIds(editedVestige, photoIds, attachmentIds));
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

  function formatVestigeWithPhotoIdsAndAttachmentIds(vestigeWithPhotosAndAttachments, photoIds, attachmentIds) {
    vestigeWithPhotosAndAttachments = {
      ...vestigeWithPhotosAndAttachments,
      photoIds,
      attachmentIds
    };

    delete vestigeWithPhotosAndAttachments.photos;
    delete vestigeWithPhotosAndAttachments.attachments;

    return vestigeWithPhotosAndAttachments;
  }

  return rep && vestige ? <VestigeForm initialValues={vestige} rep={rep} onSubmit={editVestige}></VestigeForm> : <></>;
}

export default EditVestige;
