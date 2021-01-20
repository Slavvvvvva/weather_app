import { getCarrentWeathaear } from "../API/weather-api"

let initialState = {
    CurrentWeather : null,
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

export const getCurrentWeatherTC = (cityName) => {
    return (dispatch) => {
      getCarrentWeathaear(cityName)
        .then(responce => {
           dispatch(setCurrentWeatherAC(responce))
        })
    }
  }

const WeatherReduser = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_WEATHER: return{...state, CurrentWeather: action.weatherData}
        default: return state
    }
}
export default WeatherReduser
export {setCurrentWeatherAC}