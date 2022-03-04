import { toast } from "react-toastify";
import { api, apiWithTenantAndWithToken } from "../api";



export default async function cursoDelete(perguntaId){
    return await api.delete(`pergunta/${perguntaId}`,{
      params:{
        id: perguntaId,
      }
    }).then((response) => {
            // console.log(response)
            let perguntaData = response.data
            toast.success("Excluido com sucesso!")
            location.reload(true)
            return perguntaData
          });
}
