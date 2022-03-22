import { toast } from "react-toastify";
import { api, apiWithTenantAndWithToken } from "../api";
import productFind from "./productFind";



export default async function updateProductRatings(id, stars) {
    let product = await productFind(id)

    console.log(product)


    product.somatoriaAvaliacoes =  Number(product.somatoriaAvaliacoes ) + stars  
    product.quantidadeAvaliacoes =  Number(product.quantidadeAvaliacoes) + 1 

  console.log({
    somatoriaAvaliacoes: product.somatoriaAvaliacoes,
    quantidadeAvaliacoes: product.quantidadeAvaliacoes,
})

  return await api.put(`produto/${id}`, {
    id: id,
    data:{
        somatoriaAvaliacoes:  product.somatoriaAvaliacoes,
        quantidadeAvaliacoes: product.quantidadeAvaliacoes,
    }
  })
  .then((response) => {
    // console.log(response)
    let productData = response.data
    return productData
  })
  .catch((erro)=>{
    toast.error(erro)
  });
}
