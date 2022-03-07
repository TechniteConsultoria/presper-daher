import { api, apiWithTenantAndWithToken } from "../api";



export default async function cursoLoad(){
    return await api.get(`produto`)
          .then((response) => {
            let produtoData = response.data.rows
            return produtoData
          });
}
