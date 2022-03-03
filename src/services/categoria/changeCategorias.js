import responseHandler from '../../utils/responseHandler'
import {api} from '../api'


export default async function changeCategorias(id, data){

    console.log(id)
    console.log(data)
    return await api.put(`departamento/${id}`, data).then(
        (res) => {
            let status = res.status;
            let mensagemOk = 'Categoria / Departamento modificado com sucesso :)';
            let mensagemNaoOK = 'Algo deu errado :(';

            responseHandler(status, mensagemOk, mensagemNaoOK);
            if(status == 200){
                return 'ok'
            }
        }
    
    )
}