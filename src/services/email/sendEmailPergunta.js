import { apiWithoutTenant, apiWithoutTenantAndWithToken} from '../api'
import responseHandler from '../../utils/responseHandler'
import servidorErrorMessage from '../../utils/servidorErrorMessage'


export default async function sendEmailAprovado(data) {
    return await apiWithoutTenant.post('/cliente/enviarEmailEmpresaAprovada', 
      data
      )
      .then((response) => {
        let status = response.status
        let mensagemOk = 'Pergunta enviada com sucesso! :)'
        let mensagemNaoOK = 'Algo deu errado :('
        responseHandler(status, mensagemOk, mensagemNaoOK)
        if (response.status == 200) {
          return 'ok'
        }

      })
      .catch(() => {
        servidorErrorMessage()
      })
  }