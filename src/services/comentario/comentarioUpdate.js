/*
Função usada no cadastro
*/

import {api} from '../api'

import responseHandler from '../../utils/responseHandler'
import servidorErrorMessage from '../../utils/servidorErrorMessage'


export default async function comentarioUpdate(data, id) {


  console.log("data")
  console.log(data)
    return api.put(`comentario/${id}`, data)
      .then((response) => {
        let mensagemOk = 'Seu comentario foi alterado com sucesso! Ele será revisado e logo estará na plataforma :)'
        let mensagemNaoOK = 'Revise os dados do comentario :('
        responseHandler(response.status, mensagemOk, mensagemNaoOK)
        if (response.status == 200) {
          //first check the http response, returning the result to user
          return 'ok'
        }

      })
      // .catch(() => {
      //   servidorErrorMessage()
      // })
  }