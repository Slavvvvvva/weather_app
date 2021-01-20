import * as axios from 'axios'

const instanse = axios.create({
    withCredentials : false,
    baseURL: 'https://api.openweathermap.org/data/2.5/',
    params: {
        appid : 'acf754624f6162ea7af2d33749af05cb',
        units : 'metric',
        lang: 'ua'
    }
})

export const getCarrentWeathaear = (cityName = 'Konotop')  => {
    return instanse.get (`weather?q=${cityName}`)
    .then(response => {
        return response.data
    })
}
