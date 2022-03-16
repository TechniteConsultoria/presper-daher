import { toast } from "react-toastify";
import { api, apiWithTenantAndWithToken } from "../api";



export default async function comentarioDelete(comentarioId){
    return await api.delete(`comentario/${comentarioId}`).then((response) => {
            let comentarioData = response.data
            toast.success("Excluido com sucesso!")
            return comentarioData
          });
}
