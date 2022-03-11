import { api, apiWithoutTenant } from "../api"

export default async function loadCategorias(setFunction){
  return await apiWithoutTenant.get('categoria').then(
      (response) => {
        return setFunction(response.data.rows)
      }
    )
  }