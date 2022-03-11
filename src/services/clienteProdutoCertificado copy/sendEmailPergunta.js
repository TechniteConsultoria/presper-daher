// import { api } from "../api"

// export default class clienteProdutoCertificado{
//   static async create(data){
//     let response = await api.post(`clienteProdutoCertificado`, {
//       data
//       })

//       .catch(() => {
//         servidorErrorMessage()
//       })

//       let mensagemOk = `clienteProdutoCertificado criado com sucesso! :)`
//       let mensagemNaoOK = `Revise os dados do clienteProdutoCertificado :(`
      
//       responseHandler(response.status, mensagemOk, mensagemNaoOK)
//       let responseData = response.data
//       return responseData

//   }
//   static async update(data){

//     let response = await api.put(`clienteProdutoCertificado`, {
//       data
//       })
//       .catch(() => {
//         servidorErrorMessage()
//       })

//       let mensagemOk = 'Seu clienteProdutoCertificado foi alterado com sucesso! Ele será revisado e logo estará na plataforma :)'
//       let mensagemNaoOK = 'Revise os dados do clienteProdutoCertificado :('

//       responseHandler(response.status, mensagemOk, mensagemNaoOK)
//       let responseData = response.data

//       return responseData    

//   }
//   static async delete(data){

//     let response = await api.delete(`clienteProdutoCertificado`, {
//       data
//       })
//       .catch(() => {
//         servidorErrorMessage()
//       })

//       let mensagemOk = `clienteProdutoCertificado criado com sucesso! :)`
//       let mensagemNaoOK = `Revise os dados do clienteProdutoCertificado :(`

//       responseHandler(response.status, mensagemOk, mensagemNaoOK)
//       return response
//   }

//   static async list(){

//     let response = await api.get(`clienteProdutoCertificado`)
//       .catch(() => {
//         servidorErrorMessage()
//       })

//       let data = response.data.rows

//       return data
    
//   }

//   static async find(id){

//     let response = await api.get(`clienteProdutoCertificado/${id}`)
//       .catch(() => {
//         servidorErrorMessage()
//       })

//       responseHandler(response.status, mensagemOk, mensagemNaoOK)
//       return response.data
    
//   }


// }