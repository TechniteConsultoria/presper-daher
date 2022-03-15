import { api, apiWithTenantAndWithToken } from "../api";



export default async function loadProduct(){
    return await api.get(`produto`)
          .then((response) => {
            let productData = response.data.rows
            return productData
          });
}
