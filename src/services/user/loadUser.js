/*
Aqui ficará o loadUser
*/
import HandleLocalStorageData from '../../utils/handleLocalStorage'
import axios from 'axios';
import {ip, porta} from '../api'

export default async function loadUser(token) {
    const response = await axios({
      method: "get",
      url: `${ip}:${porta}/api/auth/me`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      timeout: 50000,
    })
    .then(response => {
      console.log(response.data)
      return response.data;
    })

    let newRoleLocal = response.tenants[0].roles[0]
    let newTenatId = response.tenants[0].tenant.id
    let newId = response.id
    let newStatus = response.tenants[0].status
    let empresaId = response.empresaId
    HandleLocalStorageData(newRoleLocal, newTenatId, newId, newStatus, token, empresaId)

    return response
  }