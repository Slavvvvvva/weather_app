import * as axios from 'axios'

const instanse = axios.create({
    withCredentials : false,
    baseURL: 'https://api.openweathermap.org/data/2.5/',
    params: {
        appid : 'acf754624f6162ea7af2d33749af05cb',
        units : 'metric',
    }
})

export const getCarrentWeathaear = (cityName, lang='en')  => {
    return instanse.get (`weather?q=${cityName}&lang=${lang}`)
    .then(response => {
        return response.data
    })
}
export const getCarrentWeathaearId = (cityID,lang='en' )  => {
    return instanse.get (`weather?id=${cityID}&lang=${lang}`)
    .then(response => {
        return response.data
    })
}
export const getCNTdaysWeathaearId = ( lat, lon,lang='en' )  => {
    return instanse.get (`onecall?lat=${lat}&lon=${lon}&lang=${lang}`)
    .then(response => {
        return response.data
    })
}
