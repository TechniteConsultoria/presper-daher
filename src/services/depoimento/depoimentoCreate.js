/*
Função usada no cadastro
*/

import { api } from "../api";

import responseHandler from "../../utils/responseHandler";
import servidorErrorMessage from "../../utils/servidorErrorMessage";

export default async function depoimentoCreate(data) {
  return api
    .post("comentario", {
      data,
    })
    .then((response) => {
      let mensagemOk =
        "Recebemos seu depoimento, ele será revisado e logo estará na plataforma :)";
      let mensagemNaoOK = "Revise os dados do depoimento :(";
      responseHandler(response.status, mensagemOk, mensagemNaoOK);
      if (response.status == 200) {
        //first check the http response, returning the result to user
        return response.status;
      }
    })
    .catch(() => {
      servidorErrorMessage();
    });
}
