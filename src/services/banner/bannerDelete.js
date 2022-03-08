import { toast } from "react-toastify";
import { api, apiWithTenantAndWithToken } from "../api";



export default async function bannerDelete(bannerId){
    return await api.delete(`bannerDeleteOne/${bannerId}`,{
      params:{
        id: bannerId,
      }
    }).then((response) => {
            console.log(response)
            let bannerData = response.data
            toast.success("Excluido com sucesso!")
            return bannerData
          });
}
