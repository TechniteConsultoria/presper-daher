import responseHandler from "../../utils/responseHandler";
import { api } from "../api";


export default async function deleteProduct(id){
    return await api.delete(`produto/${id}`).then(
        (res) => {
            
            let status = res.status 
            let mensagemOk = 'Produto deletado com sucesso!'
            let mensagemNaoOK = 'Algo deu errado :('

            responseHandler(status, mensagemOk, mensagemNaoOK)
        }
    )
}