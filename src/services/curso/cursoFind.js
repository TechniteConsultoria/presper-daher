import { api, apiWithTenantAndWithToken } from "../api";



export default async function cursoFind(produtoId){
    return await api.get(`produto/${produtoId}`)
          .then((response) => {
            let produtoData = response.data
            return produtoData
          });
}
