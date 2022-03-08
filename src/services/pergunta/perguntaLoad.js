import { api, apiWithTenantAndWithToken } from "../api";



export default async function loadPergunta(){
    return await api.get(`pergunta`)
          .then((response) => {
            console.log(response)
            let perguntaData = response.data.rows
            return perguntaData
          });
}
