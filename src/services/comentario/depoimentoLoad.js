import { api, apiWithoutTenant } from "../api";

export default async function loadDepoimentos(setFunction) {
  return await apiWithoutTenant.get("depoimento").then((response) => {
    console.log(response);
    console.log(response.data.rows);
    return setFunction(response.data.rows);
  });
}
