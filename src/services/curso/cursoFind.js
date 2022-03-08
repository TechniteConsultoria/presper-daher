import { api, apiWithTenantAndWithToken } from "../api";



export default async function cursoFind(produtoId){
    return await api.get(`produto/${produtoId}`)
          .then((response) => {
            console.log("response produto find")
            console.log(response)
            let produtoData = response.data
            return produtoData
          });
}
