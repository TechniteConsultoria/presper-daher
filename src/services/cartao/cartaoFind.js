import { api, apiWithTenantAndWithToken } from "../api";



export default async function cartaoFind(cartaoId){
    return await api.get(`cartao/${cartaoId}`)
          .then((response) => {
            console.log("response cartao find")
            console.log(response)
            let cartaoData = response.data
            return cartaoData
          });
}
