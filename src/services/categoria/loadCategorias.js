import { api, apiWithoutTenant } from "../api"

export default async function loadCategorias(){
  return await apiWithoutTenant.get('categoria').then(
      (response) => {
        console.log(response.data.rows)
        return response.data.rows
      }
    )
  }