import { formatPrice } from "./format";

export default function makeSumToCarrinho(carrinhos){
    const total = carrinhos.reduce((sumTotal, carrinho) => {
            carrinho.produtos.filter(
                ({produto, quantidade}) => {
                    let precoFormatado =  parseFloat(produto.preco) 
                    sumTotal += precoFormatado * quantidade
                }
            )
        return sumTotal;
        }, 0)
    
    return total
}
