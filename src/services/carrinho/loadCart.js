import { toast } from 'react-toastify';
import { api } from '../api'


export default  async function loadCart(){
  const cartResponse = await api.get(`carrinho`)
  return cartResponse.data.rows;
}