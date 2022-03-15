import { toast } from 'react-toastify';
import responseHandler from '../../utils/responseHandler';
import { api } from '../api'


export default async function deleteAllFromCart(id){
  const response = await api.delete(`carrinhoProduto-all/${id}`) 
  .then(
    (response) => {
      let status = response.status
      let messageOk = "Produtos removidos do carrinho com sucesso!"
      let messageNotOk = "Erro nas remoções dos produtos"
      responseHandler( status, messageOk,  messageNotOk )
        if(response.status == 200){
        return response.data
      }
      else if(response.status == 500){
        toast.error("Problemas com o servidor :(")
      }
    }
  )
  return response
}