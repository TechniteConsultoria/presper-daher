/*
Função usada no cadastro
*/

import { api } from "../api";

import responseHandler from "../../utils/responseHandler";
import servidorErrorMessage from "../../utils/servidorErrorMessage";

export default async function depoimentoUpdate(data, id) {
  return api
    .put(`depoimento/${id}`, {
      data,
    })
    .then((response) => {
      let mensagemOk =
        "Seu depoimento foi alterado com sucesso! Ele será revisado e logo estará na plataforma :)";
      let mensagemNaoOK = "Revise os dados do produto :(";
      responseHandler(response.status, mensagemOk, mensagemNaoOK);
      if (response.status == 200) {
        //first check the http response, returning the result to user
        return response.status;
      }
    });
  // .catch(() => {
  //   servidorErrorMessage()
  // })
}
