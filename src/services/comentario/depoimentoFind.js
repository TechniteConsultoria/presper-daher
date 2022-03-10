import { api, apiWithTenantAndWithToken } from "../api";

export default async function depoimentoFind(depoimentoId) {
  return await api.get(`produto/${depoimentoId}`).then((response) => {
    console.log("response produto find");
    console.log(response);
    let depoimentoData = response.data;
    return depoimentoData;
  });
}
