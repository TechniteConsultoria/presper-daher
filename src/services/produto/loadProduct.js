import { api, apiWithTenantAndWithToken } from "../api";



export default async function loadProduct(){
    return await api.get(`produto`)
          .then((response) => {
            console.log(response.data.rows)
            let productData = response.data.rows
            return productData
          });
}
