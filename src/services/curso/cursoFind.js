import { api, apiWithTenantAndWithToken } from "../api";



export default async function cursoFind(perguntaId){
    return await api.get(`pergunta/${perguntaId}`)
          .then((response) => {
            // console.log(response)
            let perguntaData = response.data
            return perguntaData
          });
}
