import { toast } from "react-toastify";
import { api, apiWithTenantAndWithToken } from "../api";



export default async function comentarioDelete(comentarioId){
    return await api.delete(`comentarioDeleteOne/${comentarioId}`,{
      params:{
        id: comentarioId,
      }
    }).then((response) => {
            console.log(response)
            let comentarioData = response.data
            toast.success("Excluido com sucesso!")
            return comentarioData
          });
}
