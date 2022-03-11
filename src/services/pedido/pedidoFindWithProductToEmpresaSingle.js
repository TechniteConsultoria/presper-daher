import { api, apiWithTenantAndWithToken } from "../api";



export default async function pedidoFindWithProductToEmpresaSingle(id){
    return await api.get(`pedidoUser?filter%5BpedidoProdutoId%5D=${id}`)
          .then((response) => {
            let productData = response.data[0]
            return productData
          });
}
