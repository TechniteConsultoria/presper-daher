import { apiWithoutTenant } from "../api";



export default async function cursoFindWithRelations(produtoId){
    return await apiWithoutTenant.get(`produto/${produtoId}`)
          .then((response) => {
            console.log("response produto find")
            console.log(response)
            let produtoData = response.data
            return produtoData
          });
}
