import responseHandler from '../../utils/responseHandler'
import {api} from '../api'


export default async function deleteCategoria(id){
    // return await api.get(`user?filter%5B${filter}%5D=${valor}`).then(
    return await api.delete(`categoria/${id}`).then(
    // await api.get(`empresa?`).then(
        (res) => {
            let status = res.status 
            let mensagemOk = 'Categoria deletada com sucesso!'
            let mensagemNaoOK = 'Algo deu errado :('

            responseHandler(status, mensagemOk, mensagemNaoOK)
        }
    
    )
}