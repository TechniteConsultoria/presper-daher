import { api } from "../api"

export default async function loadCategorias(setFunction){
  return await api.get('categoria').then(
      (response) => {
        return setFunction(response.data.rows)
      }
    )
  }