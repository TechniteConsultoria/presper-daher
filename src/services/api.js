import axios from 'axios';

export let token     = () => { return localStorage.getItem("token")?.replace(/"/g, "");    }
export let tenantId  = () => { return localStorage.getItem("tenantId")?.replace(/"/g, ""); }
export let role      = () => { return localStorage.getItem("roles")?.replace(/"/g, "");    }
export let id        = () => { return localStorage.getItem("id")?.replace(/"/g, "");       }
export let empresaId = () => { return localStorage.getItem("empresaId")?.replace(/"/g, "");}
export let status    = () => { return localStorage.getItem("status")?.replace(/"/g, "");   }
export let Email     = () => { return localStorage.getItem("email")?.replace(/"/g, "");    }
export const semImagem = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Item_sem_imagem.svg/1024px-Item_sem_imagem.svg.png"
export const loadingGif = 'https://contribua.org/mb-static/images/loading.gif'


export let ip = "http://localhost";//teste local
//export let ip = "72.167.50.247";//servidor

export let porta = '8142'

export const api = axios.create({
  baseURL: `${ip}:${porta}/api/tenant/${tenantId}/`,
  // baseURL: 'http://'+ip+':8157/api/tenant/'+tenantId || "fa22705e-cf27-41d0-bebf-9a6ab52948c4" +"/",
  timeout: 50000,
  headers: {'Authorization': 'Bearer '+ token}
});

export const apiWithoutTenant = axios.create({
  baseURL: `${ip}:${porta}/api/`,
  timeout: 50000,
});

export const apiWithoutTenantAndWithToken = axios.create({
  baseURL: `${ip}:${porta}/api/`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  },
  timeout: 50000
})

export const apiWithTenantAndWithToken = axios.create({
  baseURL: `${ip}:${porta}/api/tenant/${tenantId}/`,
  timeout: 50000
})
