import { toast } from 'react-toastify';
import responseHandler from '../../utils/responseHandler';
import { api } from '../api'


export default async function deleteAllFromCart(id){
  const response = await api.delete(`carrinhoProdutoDestroyByEmpresa/${id}}`)
  .then(
    (response) => {
      let status = response.status
      responseHandler(status,"Produto adicionado ao carrinho com sucesso!",  "Erro na adição do produto")
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