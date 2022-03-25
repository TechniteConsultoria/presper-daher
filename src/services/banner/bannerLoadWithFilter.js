import { api, apiWithoutTenant } from "../api";



export default async function bannerLoadWithFilter(filter, value){
    return await apiWithoutTenant.get(`banner?filter%5B${filter}%5D=${value}`)
          .then((response) => {
            let bannerData = response.data.rows
            return bannerData
          });
}
