import responseHandler from "../utils/responseHandler";
import { api } from "./api";


export default async function loadUsers(filter, valor){
    // return await api.get(`user?filter%5B${filter}%5D=${valor}`).then(
    return await api.get(`user`).then(
    // await api.get(`empresa?`).then(
        (res) => {
            return res.data.rows
        }
    
    )
}