import { api, apiWithTenantAndWithToken } from "../api";

export default async function depoimentoFind(depoimentoId) {
  return await api.get(`comentario/${depoimentoId}`).then((response) => {
    console.log("response depoimento find");
    console.log(response);
    let depoimentoData = response.data;
    return depoimentoData;
  });
}
