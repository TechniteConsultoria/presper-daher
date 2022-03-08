import { api } from "../api"

export default async function loadCategorias(setFunction){
  return await api.get('categoria').then(
      (response) => {
        console.log(response.data.rows)
        return setFunction(response.data.rows)
      }
    )
  }