import { toast } from 'react-toastify';
import { api } from '../api'
import responseHandler from '../../utils/responseHandler';

export default async function deleteProductOfCart(productAlreadyInCart){
  const response = api.delete(`carrinhoProdutoOne/${productAlreadyInCart.id}`, { productAlreadyInCart })
  .then(
    (response) => {
      let status = response.status
      responseHandler(status, "Produto removido com sucesso!", "Erro :(")
      if(response.status == 200){

        // setUpdate(prevValue => {
        //   return prevValue-1	
        //    })
      }
      return response.data

    }
  )

  return response 
}