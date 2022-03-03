import { toast } from "react-toastify";
import { api, apiWithTenantAndWithToken } from "../api";



export default async function productUpdateAprove(product) {
  return await api.put(`produto/${product.id}`, {
    id: product.id,
    data:{
      status: true,
    }
  }).then((response) => {
    // console.log(response)
    let productData = response.data
    toast.success("Produto aprovado!")
    location.reload(true)
    return productData
  }).catch((erro)=>{
    toast.error(erro)
  });
}
