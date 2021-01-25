import { getCarrentWeathaear } from "../API/weather-api"
import store from 'store'

let initialState = {
    CurrentWeather: [],
}

const SET_CURRENT_WEATHER = 'SET_CURRENT_WEATHER'
const setCurrentWeatherAC = (city, weatherData) => {
    return (
        {
            type: SET_CURRENT_WEATHER,
            city: city,
            weatherData: weatherData
        }
    )
}

export const getCurrentWeatherTC = (cityName) => {
    return (dispatch) => {
        getCarrentWeathaear(cityName)
            .then(responce => {
                dispatch(setCurrentWeatherAC(cityName, responce))
                let citymass = store.get('city')
                if (citymass) {
                    if (citymass.every( i => i !== responce.id )) {
                        citymass.push(responce.id)
                    }
                } else {
                    citymass = []
                    citymass.push(responce.id)
                }
                store.set('city', citymass)
            })
    }
}

const WeatherReduser = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_WEATHER: {
            let stateCopy = { ...state }
            stateCopy.CurrentWeather = [...state.CurrentWeather]
            stateCopy.CurrentWeather.push(action.weatherData)
            return stateCopy
        }

        default: return state
    }
}
export default WeatherReduser
export { setCurrentWeatherAC }