/*
Função usada no cadastro
*/

import {api} from '../api'

import responseHandler from '../../utils/responseHandler'
import servidorErrorMessage from '../../utils/servidorErrorMessage'


export default async function changePergunta(data, id) {
    return api.put(`pergunta/${id}`, {
      data
      })
      .then((response) => {
        let mensagemOk = 'Seu pergunta foi alterado com sucesso! Ele será revisado e logo estará na plataforma :)'
        let mensagemNaoOK = 'Revise os dados do pergunta :('
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