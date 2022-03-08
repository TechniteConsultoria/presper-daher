import { toast } from 'react-toastify';
import responseHandler from '../../utils/responseHandler';
import { api } from '../api'


export default async function addInCart(product, cart, quantidade){
  const response = await api.post(`carrinho/`, {  product, carrinho: cart, 'quantidade': quantidade })
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