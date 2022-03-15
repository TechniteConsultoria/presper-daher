import { api, apiWithoutTenant } from "../api";

export default async function depoimentoFind(depoimentoId) {
  return await apiWithoutTenant.get(`comentario/${depoimentoId}`).then((response) => {
    let depoimentoData = response.data;
    return depoimentoData;
  });
}
