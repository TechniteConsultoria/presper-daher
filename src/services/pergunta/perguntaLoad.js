import { api, apiWithoutTenant } from "../api";



export default async function loadPergunta(key, value){
    return await apiWithoutTenant.get(`pergunta?filter%5B${key}%5D=${value}`)
          .then((response) => {
            console.log(response)
            let perguntaData = response.data.rows
            return perguntaData
          });
}
