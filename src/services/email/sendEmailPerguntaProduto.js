import { api } from '../api'
import responseHandler from '../../utils/responseHandler'
import servidorErrorMessage from '../../utils/servidorErrorMessage'


export default async function sendEmailPerguntaProduto(data) {
    return await api.post('/cliente/produto-pergunta', 
      data
      )
      .then((response) => {
        let status = response.status
        let mensagemOk = 'Pergunta enviada com sucesso! :)'
        let mensagemNaoOK = 'Algo deu errado :('
        responseHandler(status, mensagemOk, mensagemNaoOK)
        
        console.log("response")
        console.log(response)
        
        return response
        // http://localhost:3000/watch-course/103ffe94-ff67-43e5-a65a-58f66d84b27a
      })
      .catch(() => {
        servidorErrorMessage()
      })
  }