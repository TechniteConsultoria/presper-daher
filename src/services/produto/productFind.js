import { api, apiWithTenantAndWithToken } from "../api";



export default async function productFind(productId){
    return await api.get(`produto/${productId}`)
          .then((response) => {
            // console.log(response)
            let productData = response.data
            return productData
          });
}
