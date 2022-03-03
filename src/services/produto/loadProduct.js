import { api, apiWithTenantAndWithToken } from "../api";



export default async function loadProduct(){
    return await api.get(`produto`)
          .then((response) => {
            console.log(response)
            let productData = response.data
            return productData
          });
}
