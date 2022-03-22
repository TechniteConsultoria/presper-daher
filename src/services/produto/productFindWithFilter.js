import { api, apiWithoutTenant, apiWithTenantAndWithToken } from "../api";



export default async function productFindWithFilter(filter, value){
    return await apiWithoutTenant.get(`produto?filter%5B${filter}%5D=${value}`)
          .then((response) => {
            let productData = response.data.rows
            return productData
          });
}
