import { toast } from "react-toastify";
import { api, apiWithTenantAndWithToken } from "../api";



export default async function cursoDelete(produtoId){
    return await api.delete(`produto/${produtoId}`,{
      params:{
        id: produtoId,
      }
    }).then((response) => {
            // console.log(response)
            let produtoData = response.data
            toast.success("Excluido com sucesso!")
            // location.reload(true)
            return produtoData
          });
}
