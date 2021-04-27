import * as axios from 'axios'

const instanse = axios.create({
    withCredentials : false,
    baseURL: 'https://api.bigdatacloud.net/data/'
})

export const getCurrentPlace = (lat,long, lang='en')  => {
    return instanse.get (`reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=${lang}`)
    .then(response => {
        return response.data
    })
} 

