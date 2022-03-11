import { api, apiWithoutTenant } from "../api";



export default async function comentarioFind(comentarioId){
    return await apiWithoutTenant.get(`comentario/${comentarioId}`)
          .then((response) => {
            // console.log(response)
            let comentarioData = response.data
            return comentarioData
          });
}
