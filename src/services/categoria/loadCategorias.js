import { api, apiWithoutTenant } from "../api"

export default async function loadCategorias(setFunction){
  return await apiWithoutTenant.get('categoria').then(
      (response) => {
        console.log(response)
        console.log(response.data.rows)
        return setFunction(response.data.rows)
      }
    )
  }