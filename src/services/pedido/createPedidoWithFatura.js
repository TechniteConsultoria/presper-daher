import { toast } from "react-toastify"
import { api, id } from "../api"



export default async function createPedidoWithFatura(data) {

    // produtos no carrinho é o próprio rows do carrinho!
    data.compradorUserId = id
  
    let pedido = await api.post(`pedido`, data ).then(res => res.data)

    let pedidoId = pedido.id
  
    let fatura = await api.post(`pedido/${pedidoId}/fatura`,
      {
        data
      })
      .then((r) => r.data )
  
      let url = fatura.urlFaturaIugu

      console.log('url')
      console.log(url)
      
      if(url === undefined){
        toast.error("Não foi possivel gerar a fatura, confira os seu dados pessoais!")
        return 
      }
        // window.open(url, '_blank')?.focus();
        toast.success("Fatura Paga com sucesso!")
        // window.location.replace(`https://projetos.42dias.com.br/constal/#/finalizar`)
      
  
      toast.info("Gerando fatura...")

    return fatura

        
    } 