import * as axios from 'axios'

const instanse = axios.create({
    withCredentials : false,
    baseURL: 'https://api.openweathermap.org/data/2.5/',
    params: {
        appid : 'acf754624f6162ea7af2d33749af05cb',
        units : 'metric',
        lang: 'en'
    }
})

export const getCarrentWeathaear = (cityName = 'Konotop')  => {
    return instanse.get (`weather?q=${cityName}`)
    .then(response => {
        return response.data
    })
}
export const getCarrentWeathaearId = (cityID )  => {
    return instanse.get (`weather?id=${cityID}`)
    .then(response => {
        return response.data
    })
}
export const getCNTdaysWeathaearId = (cityID, cnt=3 )  => {
    return instanse.get (`forecast/daily?id=${cityID}&cnt=${cnt}`)
    .then(response => {
        return response.data
    })
}
