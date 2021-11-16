import React from "react";
import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import VestigeForm from '../../../../components/vestige-form';
import JSONLocalStorage from '../../../../utils/json-local-storage';
import ArrayLocalStorage from '../../../../utils/array-local-storage';

function RegisterVestige() {
  const router = useRouter();
  const { id } = router.query;
  const idRep = +id;

  const [rep, setRep] = React.useState();

  React.useEffect(() => {
    if (!idRep) return;
    const reps = JSONLocalStorage.get("reps");
    const foundRep = reps.find(item => item.id === idRep);
    setRep(foundRep);
  }, [idRep]);

  function registerVestige(vestige) {
    if (typeof photos !== 'undefined' && photos.length > 0) {
      for (const photo of photos) {
        db.vestigePhotos.add(photo);
      }
    }
    if (typeof attachments !== 'undefined' && attachments.length > 0) {
      for (const attachment of attachments) {
        db.vestigeAttachments.add(attachment);
      }
    }

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

  return rep ? <VestigeForm rep={rep} onSubmit={registerVestige}></VestigeForm> : <></>;
}

export default RegisterVestige;
