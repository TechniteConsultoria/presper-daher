import { api, apiWithoutTenant } from "../api";



export default async function bannerFind(bannerId){
    return await apiWithoutTenant.get(`banner/${bannerId}`)
          .then((response) => {
            // console.log(response)
            let bannerData = response.data
            return bannerData
          });
}
