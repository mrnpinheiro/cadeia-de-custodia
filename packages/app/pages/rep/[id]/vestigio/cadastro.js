import React from "react";
import { useRouter } from 'next/router';

import Dexie from 'dexie';
import { toast } from 'react-toastify';

import VestigeForm from '../../../../components/vestige-form';
import JSONLocalStorage from '../../../../utils/json-local-storage';
import ArrayLocalStorage from '../../../../utils/array-local-storage';

function RegisterVestige() {
  const router = useRouter();
  const { id } = router.query;
  const idRep = +id;

  const [rep, setRep] = React.useState();

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

  React.useEffect(() => {
    if (!idRep) return;
    const reps = JSONLocalStorage.get("reps");
    const foundRep = reps.find(item => item.id === idRep);
    setRep(foundRep);
  }, [idRep]);

  async function registerVestige(vestige) {
    const photoIds = [];
    if (vestige.photos) {
      const photosToAdd = vestige.photos;
      photoIds = await db.vestigePhotos.bulkAdd(photosToAdd, {allKeys: true});
    }
    let attachmentIds = [];
    if (vestige.attachments) {
      const attachmentsToAdd = vestige.attachments;
      attachmentIds = await db.vestigeAttachments.bulkAdd(attachmentsToAdd, {allKeys: true});
    }

    ArrayLocalStorage.push("vestiges", formatVestigeWithPhotoIdsAndAttachmentIds(vestige, photoIds, attachmentIds));
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

  return rep ? <VestigeForm rep={rep} onSubmit={registerVestige}></VestigeForm> : <></>;
}

export default RegisterVestige;
