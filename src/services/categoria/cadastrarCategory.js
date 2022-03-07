/*
Função usada no cadastro
*/

import {api} from '../api'
import responseHandler from '../../utils/responseHandler'
import servidorErrorMessage from '../../utils/servidorErrorMessage'


export default async function cadastrarCategory(data) {
    return await api.post('categoria', {
      data
      })
      .then((response) => {
        let mensagemOk = 'Categoria criada com sucesso! :)'
        let mensagemNaoOK = 'Algo deu errado :('
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