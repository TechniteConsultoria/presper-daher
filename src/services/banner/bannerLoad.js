import { api, apiWithoutTenant } from "../api";



export default async function bannerLoad(){
    return await apiWithoutTenant.get(`banner`)
          .then((response) => {
            let bannerData = response.data.rows
            return bannerData
          });
}
