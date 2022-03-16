import { toast } from "react-toastify";
import { api, apiWithTenantAndWithToken } from "../api";

export default async function depoimentoDelete(depoimentoId) {
  return await api.delete(`comentario/${depoimentoId}`)
    .then((response) => {
      toast.success("Excluido com sucesso!");
      return response.status;
    });
}
