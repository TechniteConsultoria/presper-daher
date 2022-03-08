import { toast } from 'react-toastify';
import responseHandler from '../../utils/responseHandler';
import { api } from '../api'


export default async function addInCart(product, quantidade){
  const response = await api.post(`carrinhoProduto/`, { data:{ product, 'quantidade': quantidade} })
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