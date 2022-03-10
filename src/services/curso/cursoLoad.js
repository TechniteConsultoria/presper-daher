import { api, apiWithoutTenant, apiWithTenantAndWithToken } from "../api";



export default async function cursoLoad(){
    return await apiWithoutTenant.get(`produto`)
          .then((response) => {
            let produtoData = response.data.rows
            return produtoData
          });
}
