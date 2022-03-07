import { api, apiWithTenantAndWithToken } from "../api";



export default async function bannerLoad(){
    return await api.get(`banner`)
          .then((response) => {
            let bannerData = response.data.rows
            return bannerData
          });
}
