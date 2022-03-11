/*
Função usada no cadastro
*/

import {api} from '../api'

import responseHandler from '../../utils/responseHandler'
import servidorErrorMessage from '../../utils/servidorErrorMessage'


export default async function cadastrarProduct(data) {
    return api.post('produto', {
      data
      })
      .then((response) => {
        let mensagemOk = 'Recebemos seu produto, ele será revisado e logo estará na plataforma :)'
        let mensagemNaoOK = 'Revise os dados do produto :('
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