import { getCarrentWeathaear, getCarrentWeathaearId, getCNTdaysWeathaearId } from "../API/weather-api"
import store from 'store'

let initialState = {
    CurrentWeather: [],
    CNTdaysWeather: null
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
const SET_CNTDAYS_WEATHER = 'SET_CNTDAYS_WEATHER'
const setCNTDaysWeatherAC = (weatherData) => {
    return (
        {
            type: SET_CNTDAYS_WEATHER,
            weatherData: weatherData,
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

export const getCNTDaysWeatherTC = (lat, lon) => {
    return (dispatch) => {
        getCNTdaysWeathaearId(lat, lon)
            .then(responce => {
                dispatch(setCNTDaysWeatherAC(responce))
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
        case SET_CNTDAYS_WEATHER: return {...state, CNTdaysWeather: action.weatherData }

        default: return state
    }
}
export default WeatherReduser
export { setCurrentWeatherAC }