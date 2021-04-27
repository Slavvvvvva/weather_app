import { getCarrentWeathaear, getCarrentWeathaearId, getCNTdaysWeathaearId } from "../API/weather-api"
import store from 'store'
import { stopSubmit, reset } from 'redux-form'
import { getCurrentPlace } from "../API/geocoding-api"

let initialState = {
    CurrentWeather: [],
    CNTdaysWeather: [],
    yourPosition: {},
    yourPositionWeather:null,
    yourPositionId:[],
    yourPositionCity:{}
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

const DELATE_LOCATION_WEATHER = 'DELATE_LOCATION_WEATHER'
const delLocationWeatherAC = () => {
    return (
        {
            type: DELATE_LOCATION_WEATHER,
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

const SET_YOUR_POSITION = 'SET_YOUR_POSITION'
const setYourPositionAC = (lat, long, timestamp) =>{
    return (
        {
            type: SET_YOUR_POSITION,
            lat: lat,
            long: long,
            timestamp: timestamp
        }
    )
}

const SET_POSITION_ID = 'SET_POSITION_ID'
const setPositionIdAC = (id) =>{
    return (
        {
            type: SET_POSITION_ID,
            id: id
        }
    )
}

const DEL_POSITION_ID = 'DEL_POSITION_ID'
const delPositionIdAC = () =>{
    return (
        {
            type: DEL_POSITION_ID,
            
        }
    )
}

const SET_YOUR_POSITION_WEATHER = 'SET_YOUR_POSITION_WEATHER'
const setYourPositionWeatherAC = (weatherData) => {
    return (
        {
            type: SET_YOUR_POSITION_WEATHER,
            weatherData: weatherData,
        }
    )
}
const SET_YOUR_POSITION_CITY_NAME = 'SET_YOUR_POSITION_CITY_NAME'
const setYourPositionCityNameAC = (locationData) => {
    return (
        {
            type: SET_YOUR_POSITION_CITY_NAME,
            locationData,
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

export const getPositionTC = () => {
    return (dispatch) => {
        let positionId = navigator.geolocation.watchPosition((position) => {
            dispatch(setYourPositionAC(position.coords.latitude, position.coords.longitude, position.timestamp))
            store.set('position',true)
            console.log(position)
          }, () => console.log('не получилось получить координаты'),{
            enableHighAccuracy: true,
            maximumAge        : 30000,
            timeout           : 27000
        })
        if (!navigator.geolocation) {
            console.log('Geolocation не поддерживается вашим браузером')
          } else {
            dispatch(setPositionIdAC(positionId))
          }
    }
}

export const stopTrackingLocationTC = (id) => {
    return (dispatch) => {
        id.forEach( (item)=>{
            debugger
            navigator.geolocation.clearWatch(item)
        })
        
        dispatch(delLocationWeatherAC())
        dispatch(delPositionIdAC())
    }
}

export const getPositionWeatherTC = (lat,lon,lang) => {
    return (dispatch) => {
        getCNTdaysWeathaearId(lat,lon, lang)
                    .then(responce =>{
                        dispatch(setYourPositionWeatherAC(responce))
                    })
    }
}

export const getPositionCityTC = (lat,lon,lang) => {
    return (dispatch) => {
        getCurrentPlace(lat,lon, lang)
                    .then(responce =>{
                        dispatch(setYourPositionCityNameAC({city:responce.city, locality:responce.locality}))
                        console.log(responce)
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
        case DELATE_LOCATION_WEATHER:
            store.set('position',false)
            return {...state, yourPositionWeather:null, yourPosition: {} }
        case DELATE_ALL_CURRENT_WEATHER : return {...state, CurrentWeather:[]}
        case SET_YOUR_POSITION : return {...state, yourPosition: {lat: action.lat, long: action.long, timestamp: action.timestamp}}
        case SET_POSITION_ID :
            let stateCopy = { ...state }
            stateCopy.yourPositionId = [...state.yourPositionId]
            stateCopy.yourPositionId.push(action.id)
            return stateCopy 
        case DEL_POSITION_ID : return {...state, yourPositionId: []}
        case SET_YOUR_POSITION_WEATHER: return {...state, yourPositionWeather:action.weatherData}
        case SET_YOUR_POSITION_CITY_NAME: return {...state, yourPositionCity: action.locationData}
        default: return state
    }
}
export default WeatherReduser
export { setCurrentWeatherAC, delCurrentWeatherAC, delLocationWeatherAC, delAllCurrentWeatherAC, setYourPositionAC }