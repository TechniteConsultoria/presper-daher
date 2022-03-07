/*
Função usada no cadastro
*/

import {api} from '../api'

import responseHandler from '../../utils/responseHandler'
import servidorErrorMessage from '../../utils/servidorErrorMessage'


export default async function bannerCreate(data) {
    return api.post('banner', {
      data
      })
      .then((response) => {
        let mensagemOk = 'Banner criado com sucesso! :)'
        let mensagemNaoOK = 'Revise os dados do banner :('
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