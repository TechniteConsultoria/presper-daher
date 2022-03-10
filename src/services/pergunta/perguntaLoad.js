import { api, apiWithoutTenant } from "../api";



export default async function loadPergunta(){
    return await apiWithoutTenant.get(`pergunta`)
          .then((response) => {
            console.log(response)
            let perguntaData = response.data.rows
            return perguntaData
          });
}
