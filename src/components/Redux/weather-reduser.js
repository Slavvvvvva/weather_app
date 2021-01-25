import { getCarrentWeathaear, getCarrentWeathaearId } from "../API/weather-api"
import store from 'store'

let initialState = {
    CurrentWeather: [],
}

const SET_CURRENT_WEATHER = 'SET_CURRENT_WEATHER'
const setCurrentWeatherAC = ( weatherData) => {
    return (
        {
            type: SET_CURRENT_WEATHER,
            weatherData: weatherData
        }
    )
}

export const getCurrentWeatherTC = (cityName) => {
    return (dispatch) => {
        getCarrentWeathaear(cityName)
            .then(responce => {
                let citymass = store.get('city')
                if (citymass) {
                    dispatch(setCurrentWeatherAC(responce))
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

export const getCurrentWeatherIdTC = (cityid) => {
    return (dispatch) => {
        getCarrentWeathaearId(cityid)
            .then(responce => {
                dispatch(setCurrentWeatherAC(responce))
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