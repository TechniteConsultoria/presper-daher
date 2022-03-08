import { toast } from 'react-toastify';
import responseHandler from '../../utils/responseHandler';
import { api } from '../api'


export default async function deleteManyFromCart(ids){
  const response = await api.delete(`carrinhoProduto`, { data :{ids: ids} })
  .then(
    (response) => {
      let status = response.status
      responseHandler(
        status,
        "Fornecedor deletado do carrinho com sucesso!",
         "Erro na remoção do fornecedor"
         )
         
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