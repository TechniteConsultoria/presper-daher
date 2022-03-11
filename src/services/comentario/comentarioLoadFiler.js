import { api, apiWithoutTenant } from "../api";



export default async function comentarioLoadFiler(id){
    return await apiWithoutTenant.get(`comentario?filter%5BprodutoId%5D=${id}`)
          .then((response) => {
            let comentarioData = response.data.rows
            return comentarioData
          });
}
