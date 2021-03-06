/*
Função usada no cadastro
*/

import {api} from '../api'

import responseHandler from '../../utils/responseHandler'
import servidorErrorMessage from '../../utils/servidorErrorMessage'


export default async function changeProduct(data, id) {
    return api.put(`produto/${id}`, {
      data
      })
      .then((response) => {
        let mensagemOk = 'Seu produto foi alterado com sucesso! :)'
        let mensagemNaoOK = 'Revise os dados do produto :('
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