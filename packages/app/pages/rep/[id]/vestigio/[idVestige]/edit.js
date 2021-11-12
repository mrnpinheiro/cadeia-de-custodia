import React from "react";
import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import VestigeForm from '../../../../../components/vestige-form';
import ArrayLocalStorage from '../../../../../utils/array-local-storage';
import JSONLocalStorage from '../../../../../utils/json-local-storage';

function EditVestige() {
  const router = useRouter();
  const { id } = router.query;
  const idRep = +id;

  React.useEffect(() => {
    if (!idRep) return;
    const reps = JSONLocalStorage.get("reps");
    const foundRep = reps.find(item => item.id === idRep);
    setRep(foundRep);
  }, [idRep]);

  const [rep, setRep] = React.useState();

  function registerVestige(vestige) {
    for (const photo of photos) {
      db.vestigePhotos.add(photo);
    }
    for (const attachment of attachments) {
      db.vestigeAttachments.add(attachment);
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

export default EditVestige;
