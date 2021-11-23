import React from "react";
import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import RepForm from '../../components/rep-form';
import ArrayLocalStorage from '../../utils/array-local-storage';

function RegisterRep() {
  const router = useRouter();

  function registerRep(rep) {
    ArrayLocalStorage.push("reps", rep);
    toast.success("Rep cadastrada com sucesso!", {
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

  return <RepForm onSubmit={registerRep}></RepForm>;
}

export default RegisterRep;