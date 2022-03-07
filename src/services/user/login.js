import{ apiWithoutTenant }from '../api'
import { toast } from "react-toastify";

import handleLocalStorageEmailAndPassword from '../../utils/handleLocalStorageEmailAndPassword'
import responseHandler from '../../utils/responseHandler'
import loadUser from './loadUser'
import servidorErrorMessage from '../../utils/servidorErrorMessage'

export default async function login(email, password) {
    return apiWithoutTenant.post(`auth/sign-in`, {
      email: email,
      password: password,
    })  
    .then(
      async (response) => {

     let messageOk = `Login efetuado com sucesso! :)`
     let messageNotOk = `Ops, Dados Incorretos!`
     
     responseHandler(response.status, messageOk, messageNotOk )
      if (response.status == 200) {

        await loadUser(response.data)
        handleLocalStorageEmailAndPassword(email, password)
        return 'ok'
      }
    })
     .catch((error) => {
    console.log(error)
      if (error.response) {
        toast.error(error.response.data);
      }
      else {
        servidorErrorMessage()
      }
    })
} 