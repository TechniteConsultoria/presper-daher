import axios from "axios"
import { toast } from "react-toastify"
import { api, ip, porta } from "../api"


export default async function uploadImage(newImage, setImage) {
    const formData = new FormData()

    console.log(newImage)

    formData.append('file', newImage)

    let imageName = newImage.name
    console.log(imageName)

    let credentials = await api.get(`file/credentials`, {
        params: {
            filename: imageName,
            storageId: 'produtoImagem1',
        },
    })
    if (credentials.status != 200) {
        toast.info('Imagem inválida, ou problemas com o servidor :(')
        return
    }

    let credentialsData = credentials.data

    let credencial = credentialsData.uploadCredentials.url

    console.log(credentialsData)

    let credentialCleaned = credencial.replace('"http://localhost:8157/api" ;localhost', '')
    let downloadExtension = credentialsData.downloadUrl.replace('"http://localhost:8157/api" ;localhost', '')

    let ipLoad = `${ip}:${porta}/api${credentialCleaned}`

    let upload = await axios.post(ipLoad, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    if (upload.status != 200) {
        console.log(upload)
        toast.info('Imagem inválida')
        return
    }
    toast.success('Imagem Válida!')

    let pathToImage = `${ip}:${porta}/api${downloadExtension}`

    console.log(pathToImage)

    setImage(pathToImage)

    return pathToImage
}