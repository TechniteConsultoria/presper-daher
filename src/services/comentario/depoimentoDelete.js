import { toast } from "react-toastify";
import { api, apiWithTenantAndWithToken } from "../api";

export default async function depoimentoDelete(depoimentoId) {
  return await api
    .delete(`depoimento/${depoimentoId}`, {
      params: {
        id: depoimentoId,
      },
    })
    .then((response) => {
      // console.log(response)
      // let depoimentoData = response.data;

      toast.success("Excluido com sucesso!");
      // location.reload(true)
      // return depoimentoData;
      return response.status;
    });
}
