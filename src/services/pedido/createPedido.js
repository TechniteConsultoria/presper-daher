import { api } from "../api"
import servidorErrorMessage from '../../utils/servidorErrorMessage'
import responseHandler from '../../utils/responseHandler'


export default async function createPedido(produtoDoFornecedor){ 
    console.log("produtoDoFornecedor")
    console.log(produtoDoFornecedor)
    return await api.post('pedido', { data: produtoDoFornecedor  })
    .then(
        (response) => {
            let status = response.status
            let mensagemOk = 'Pedido criado com sucesso! :)'
            let mensagemNaoOK = 'Algo deu errado :('
            responseHandler(status, mensagemOk, mensagemNaoOK)
            if (status != 200) {
              return //first check the http response, returning the result to user
            }
            return 'ok'
        }
    )
    .catch(
        e => {
            console.log(e)
            servidorErrorMessage()
        }
    )
}