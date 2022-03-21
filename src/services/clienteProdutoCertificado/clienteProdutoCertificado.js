
import {api} from '../api'

import responseHandler from '../../utils/responseHandler'
import servidorErrorMessage from '../../utils/servidorErrorMessage'


export default class clienteProdutoCertificado{
  static async create(data){
    let response = await api.post(`clienteProdutoCertificado`, {
      data
      })

      .catch(() => {
        servidorErrorMessage()
      })

      let responseData = response.data
      return responseData

  }
  static async update(id, data){

    let response = await api.put(`clienteProdutoCertificado/${id}`, {
      data
      })
      .catch(() => {
        servidorErrorMessage()
      })

      /*
      let mensagemOk = 'Seu clienteProdutoCertificado foi alterado com sucesso! Ele será revisado e logo estará na plataforma :)'
      let mensagemNaoOK = 'Revise os dados do clienteProdutoCertificado :('
      responseHandler(response.status, mensagemOk, mensagemNaoOK)
      */
      let responseData = response.data

      return responseData    

  }
  static async delete(data){

    let response = await api.delete(`clienteProdutoCertificado`, {
      data
      })
      .catch(() => {
        servidorErrorMessage()
      })

      return response
  }

  static async list(){

    let response = await api.get(`clienteProdutoCertificado`)
      .catch(() => {
        servidorErrorMessage()
      })

      let responseData = response.data.rows

      return responseData
    
  }

  static async listWithFilter(filter ,value){

    let response = await api.get(`clienteProdutoCertificado?filter%5B${filter}%5D=${value}`)
      .catch(() => {
        servidorErrorMessage()
      })

      let responseData = response.data.rows

      return responseData
    
  }

  static async listWithManyFilters(filters){
    let response = await api.get(`clienteProdutoCertificado?${filters}`)
      .catch(() => {
        servidorErrorMessage()
      })

      let responseData = response.data.rows

      return responseData
    
  }

  static async find(id){

    let response = await api.get(`clienteProdutoCertificado/${id}`)

      .catch(() => {
        servidorErrorMessage()
      })

      return response.data
    
  }


}