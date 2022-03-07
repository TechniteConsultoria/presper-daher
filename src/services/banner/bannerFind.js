import { api, apiWithTenantAndWithToken } from "../api";



export default async function bannerFind(bannerId){
    return await api.get(`banner/${bannerId}`)
          .then((response) => {
            // console.log(response)
            let bannerData = response.data
            return bannerData
          });
}
