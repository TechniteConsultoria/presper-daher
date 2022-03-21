import { apiWithoutTenant } from "../api";



export default async function cursoFindWithRelations(produtoId){
    return await apiWithoutTenant.get(`produto/${produtoId}`)
          .then((response) => {
            let produtoData = response.data
            return produtoData
          });
}
