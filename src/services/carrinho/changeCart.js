import { toast } from 'react-toastify';
import { api } from '../api'
import responseHandler from '../../utils/responseHandler';

export default async function changeCart(productAlreadyInCart){
  const response = await api.put(`carrinho/${productAlreadyInCart.id}`, { data : { productAlreadyInCart }})
  .then(
    (response) => {
      let status = response.status
      responseHandler(status,"Produto adicionado ao carrinho com sucesso!",  "Erro na adição do produto")
      if(response.status == 200){
        // setUpdate(prevValue => {
        //   return prevValue+1	
        //    })

        // console.log("update 1")
        // console.log(update)

        return response.data
      }
      else if(response.status == 500){
        toast.error("Problemas com o servidor :(")
      }
    }
  )
  return response
}