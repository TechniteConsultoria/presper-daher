import { toast } from "react-toastify";
import { api, apiWithTenantAndWithToken } from "../api";



export default async function producDelete(productId){
    return await api.delete(`produto/${productId}`,{
      params:{
        id: productId,
      }
    }).then((response) => {
            // console.log(response)
            let productData = response.data
            toast.success("Excluido com sucesso!")
            location.reload(true)
            return productData
          });
}
