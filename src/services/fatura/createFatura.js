import { api, ip } from "../api"
import servidorErrorMessage from '../../utils/servidorErrorMessage'


export default async function createFatura(pedidoId) {
    return await api.post(`/pedido/${pedidoId}/fatura`)
    .then(
        (response) => {
            let url = response.data.urlFaturaIugu
            console.log('url') 
            console.log(url)
            let status = response.status
            let mensagemOk = 'Fatura gerada com sucesso! :)'
            let mensagemNaoOK = 'Algo deu errado :('
            responseHandler(status, mensagemOk, mensagemNaoOK)
            
            if(url === undefined){
                toast.error(
                `Não foi possivel gerar a fatura,
                 confira os seu dados pessoais e tente novamente!`
                 )
                return
            }

            window.open(url, '_blank')?.focus();
            window.location.replace(`${ip}/#/finalizar`)
                
        }
    )
    .catch((error)=>{
        toast.error(error)
        
    })
}