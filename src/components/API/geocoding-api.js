import * as axios from 'axios'

const instanse = axios.create({
    withCredentials : false,
    baseURL: 'https://api.bigdatacloud.net/data/reverse-geocode-client?'
})

export const getCurrentPlace = (lat,long, lang='en')  => {
    return instanse.get (`latitude=${lat}&longitude=${long}&localityLanguage=${lang}`)
    .then(response => {
        return response.data
    })
}