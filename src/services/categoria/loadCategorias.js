import { api } from "../api"

export default function loadCategorias(setFunction){
    api.get('categoria').then(
      (response) => {
        console.log(response)
        console.log(response.data.rows)
        return setFunction(response.data.rows)
      }
    )
  }