export default function getIdFromUrl(hashUrl){
    // gets the product id throught the page url!!!
    const rawUrl = window.location.hash
    const id = rawUrl.replace(hashUrl, '')
    return id
  }