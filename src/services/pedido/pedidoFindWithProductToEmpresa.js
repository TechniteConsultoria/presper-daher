import { api, apiWithTenantAndWithToken } from "../api";



export default async function pedidoFindWithProductToEmpresa(empresaId){
    return await api.get(`pedidoUser?filter=[userId]=${empresaId}`)
          .then((response) => {
            // console.log(response)
            let productData = response.data
            return productData
          });
}
