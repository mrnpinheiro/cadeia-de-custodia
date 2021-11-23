import React from "react";
import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import RepForm from '../../../../components/rep-form';
import ArrayLocalStorage from '../../../utils/array-local-storage';

function EditRep() {
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

  function editRep(editedRep) {
    ArrayLocalStorage.push("reps", editedRep);
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

  return rep ? <RepForm initialValue={rep} onSubmit={editRep}></RepForm> : <></>;
}

export default EditRep;
