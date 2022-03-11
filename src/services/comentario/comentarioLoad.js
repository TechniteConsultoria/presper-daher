import { api, apiWithoutTenant } from "../api";



export default async function comentarioLoad(){
    return await apiWithoutTenant.get(`comentario`)
          .then((response) => {
            let comentarioData = response.data.rows
            return comentarioData
          });
}
