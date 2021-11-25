import React from "react";
import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import RepForm from '../../../components/rep-form';
import ArrayLocalStorage from '../../../utils/array-local-storage';

function EditRep() {
  const router = useRouter();
  const { id } = router.query;
  const idRep = +id;

  const [rep, setRep] = React.useState();
  const [repIndex, setRepIndex] = React.useState();

  React.useEffect(() => {
    if (!idRep) return;
    const reps = ArrayLocalStorage.get("reps");
    const foundRep = reps.find(item => item.id === idRep);
    const foundRepIndex = reps.findIndex(item => item.id === idRep);
    setRep(foundRep);
    setRepIndex(foundRepIndex);
  }, [idRep]);

  function editRep(editedRep) {
    ArrayLocalStorage.update("reps", repIndex, editedRep);
    toast.success("Rep atualizada com sucesso!", {
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

  return rep ? <RepForm initialValues={rep} onSubmit={editRep}></RepForm> : <></>;
}

export default EditRep;
