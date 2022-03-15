import { api, apiWithoutTenant } from "../api";

export default async function loadDepoimentos(setFunction) {
  return await apiWithoutTenant.get("comentario").then((response) => {
    return setFunction(response.data.rows);
  });
}
