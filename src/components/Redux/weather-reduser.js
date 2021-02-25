import { getCarrentWeathaear, getCarrentWeathaearId, getCNTdaysWeathaearId } from "../API/weather-api"
import store from 'store'
import { stopSubmit, reset } from 'redux-form'

let initialState = {
    CurrentWeather: [],
    CNTdaysWeather: []
}

const SET_CURRENT_WEATHER = 'SET_CURRENT_WEATHER'
const setCurrentWeatherAC = (weatherData) => {
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

const DELATE_CURRENT_WEATHER = 'DELATE_CURRENT_WEATHER'
const delCurrentWeatherAC = (id) => {
    return (
        {
            type: DELATE_CURRENT_WEATHER,
            id: id,
        }
    )
}

const DELATE_ALL_CURRENT_WEATHER = 'DELATE_ALL_CURRENT_WEATHER'
const delAllCurrentWeatherAC = () => {
    return (
        {
            type: DELATE_ALL_CURRENT_WEATHER,
        }
    )
}

export const getCurrentWeatherTC = (cityName,lang) => {
    return (dispatch) => {
        getCarrentWeathaear(cityName,lang)
            .then(responce => {
                if (responce.cod === 200) {
                    let citymass = store.get('city')
                    const chackDoubleCard =(citymass=[]) => {
                        if (citymass.every(i => i !== responce.id)) {
                            citymass.push(responce.id)
                            dispatch(setCurrentWeatherAC(responce))
                            store.set('city', citymass)
                            dispatch(reset('AddCity'))
                        }
                        else{
                            dispatch(stopSubmit('AddCity', { 'cityName': `${(lang ==="ru")?'вы уже добавили этот город':'you already add this city'}`}))
                        }
                    }
                    chackDoubleCard(citymass)
                }
            })
            .catch( responce => {
                console.log(responce)
                dispatch(stopSubmit('AddCity', { 'cityName': `${(lang ==="ru")?'город не найден':'city not found'}`}))
            }) 
    }
}

export const getCurrentWeatherIdTC = (cityid, lang) => {
    return (dispatch) => {
        getCarrentWeathaearId(cityid,lang)
            .then(responce => {
                dispatch(setCurrentWeatherAC(responce))
                let citymass = store.get('city')
                if (citymass) {
                    if (citymass.every(i => i !== responce.id)) {
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

export const getCNTDaysWeatherTC = (lat, lon, lang) => {
    return (dispatch) => {
        getCNTdaysWeathaearId(lat, lon, lang)
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
        case SET_CNTDAYS_WEATHER: return { ...state, CNTdaysWeather: action.weatherData }
        case DELATE_CURRENT_WEATHER:
            let citymass = store.get('city')
            store.set('city', citymass.filter(item => item !== action.id ))
            return {...state, 
            CurrentWeather: state.CurrentWeather.filter(item => item.id !== action.id )       
        }
        case DELATE_ALL_CURRENT_WEATHER : return {...state, CurrentWeather:[]}
        default: return state
    }
}
export default WeatherReduser
export { setCurrentWeatherAC, delCurrentWeatherAC, delAllCurrentWeatherAC }