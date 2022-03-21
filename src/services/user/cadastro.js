
/*
Função usada no cadastro
*/

import {apiWithoutTenant} from '../api'
import handleLocalStorageEmailAndPassword from '../../utils/handleLocalStorageEmailAndPassword'
import responseHandler from '../../utils/responseHandler'
import loadUser from './loadUser'
import servidorErrorMessage from '../../utils/servidorErrorMessage'

// NÃO POSSUI NOME

export default async function cadastro(name, email, password, phone, cpf, role, invitationToken,  tenantId) {

    return apiWithoutTenant.post('auth/sign-up', {
      fullName:        name,
      email:           email, 
      telefone:        phone, 
      cpf:             cpf, 
      password:        password, 
      role:            role, 
      invitationToken: invitationToken,
      tenantId:        tenantId
      })
      .then((response) => {

        let mensagemOk = 'Opa, recebemos o seu registro :)'

        responseHandler(response.status, mensagemOk)

        if (response.status == 200) {
          //first check the http response, returning the result to user
          handleLocalStorageEmailAndPassword(email, password)
          loadUser(response.data)
          return 'ok'
        }

      })
      .catch(() => {
        servidorErrorMessage()
      })
  }