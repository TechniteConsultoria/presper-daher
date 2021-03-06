import responseHandler from '../../utils/responseHandler'
import {api} from '../api'


export default async function changeCategorias(id, data){

    return await api.put(`categoria/${id}`, { data }).then(
        (res) => {
            let status = res.status;
            let mensagemOk = 'Categoria / categoria modificado com sucesso :)';
            let mensagemNaoOK = 'Algo deu errado :(';

            responseHandler(status, mensagemOk, mensagemNaoOK);
            if(status == 200){
                return 'ok'
            }
        }
    
    )
}