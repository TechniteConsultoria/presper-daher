/*
Função usada no cadastro
*/

import {api} from '../api'

import responseHandler from '../../utils/responseHandler'
import servidorErrorMessage from '../../utils/servidorErrorMessage'


export default async function cursoUpdate(data, id) {
    return api.put(`produto/${id}`, {
      data
      })
      .then((response) => {
        
        return response.status

      })
      // .catch(() => {
      //   servidorErrorMessage()
      // })
  }