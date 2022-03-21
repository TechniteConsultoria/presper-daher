import { api, apiWithoutTenant } from "../api"

export default async function loadCategorias(){
  return await apiWithoutTenant.get('categoria').then(
      (response) => {
        return response.data.rows
      }
    )
  }