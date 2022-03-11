import { toast } from "react-toastify";
import { api, apiWithTenantAndWithToken } from "../api";



export default async function cartaoDelete(cartaoId){
    return await api.delete(`cartao/${cartaoId}`,{
      params:{
        id: cartaoId,
      }
    }).then((response) => {
            // console.log(response)
            let cartaoData = response.data
            toast.success("Excluido com sucesso!")
            // location.reload(true)
            return cartaoData
          });
}
