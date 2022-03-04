
/*
Função usada no cadastro
*/

import { api } from '../api'
import handleLocalStorageEmailAndPassword from '../../utils/handleLocalStorageEmailAndPassword'
import responseHandler from '../../utils/responseHandler'
import loadUser from './loadUser'
import servidorErrorMessage from '../../utils/servidorErrorMessage'

export default async function updateUser(id, data) {

    return api.put(`user/${id}`, data)
      .then((response) => {
        console.log(response)

        let mensagemOk = 'Opa, recebemos sua alteração! :)'

        responseHandler(response.status, mensagemOk)

        if (response.status == 200) {
          //first check the http response, returning the result to user
          handleLocalStorageEmailAndPassword(data.email, data.password)
          loadUser(response.data)
          return 'ok'
        }

      })
      .catch(() => {
        servidorErrorMessage()
      })
  }