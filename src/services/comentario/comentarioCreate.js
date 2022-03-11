/*
Função usada no cadastro
*/

import {api} from '../api'

import responseHandler from '../../utils/responseHandler'
import servidorErrorMessage from '../../utils/servidorErrorMessage'


export default async function comentarioCreate(data) {
    return api.post('comentario', {
      data
      })
      .then((response) => {
        let mensagemOk = 'comentario criado com sucesso! :)'
        let mensagemNaoOK = 'Revise os dados do comentario :('
        responseHandler(response.status, mensagemOk, mensagemNaoOK)
        if (response.status == 200) {
          //first check the http response, returning the result to user
          return 'ok'
        }

      })
      .catch(() => {
        servidorErrorMessage()
      })
  }