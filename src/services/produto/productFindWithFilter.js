import { api, apiWithTenantAndWithToken } from "../api";



export default async function productFindWithFilter(filter, value){
    return await api.get(`produto?filter%5B${filter}%5D=${value}`)
          .then((response) => {
            let productData = response.data.rows
            return productData
          });
}
