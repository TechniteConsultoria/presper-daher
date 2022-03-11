import { toast } from 'react-toastify';
import { api } from '../api'


export default  async function loadCart(){
  try{
    const cartResponse = await api.get(`carrinho`)
    return cartResponse.data.rows;
  }
  catch(e){
    console.error(e)
  }
}