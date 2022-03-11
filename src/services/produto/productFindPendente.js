import { api, apiWithTenantAndWithToken } from "../api";



export default async function productFindPendente(role){
    return await api.get(`produto?filter%5Bstatus%5D=false&filter%5Brole%5D=${role}`)
          .then((response) => {
            // console.log(response)
            let productData = response.data
            return productData
          });
}
