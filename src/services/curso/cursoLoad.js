import { api, apiWithTenantAndWithToken } from "../api";



export default async function cursoLoad(){
    return await api.get(`pergunta`)
          .then((response) => {
            console.log(response)
            let perguntaData = response.data.rows
            return perguntaData
          });
}
