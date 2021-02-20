import store from 'store'

let initialState = {
    darkMode : false,
    activeCityName: null,
    dailyHourly: false
}

const CHAINGE_DARK_MODE = 'CHAINGE_DARK_MODE'
const chaingeDarckModeAC = () => {
    return (
        {
            type: CHAINGE_DARK_MODE
        }
    )
}
const SET_MODE = 'SET_MODE'
const setModeAC = (mode) => {
    return (
        {
            type: SET_MODE,
            mode: mode
        }
    )
}

const SET_ACTIVE_CITY = 'SET_ACTIVE_CITY'
const chaingeActiveCityAC = (city) => {
    return (
        {
            type: SET_ACTIVE_CITY,
            city: city

        }
    )
}
const TOGLE_DETEIL_WEATHER = 'TOGLE_DETEIL_WEATHER'
const TogleDetailWeatherAC = () => {
    return (
        {
            type: TOGLE_DETEIL_WEATHER
        }
    )
}

const GlobalSettingsReduser = (state = initialState, action) => {
    switch (action.type) {
        case CHAINGE_DARK_MODE:
            store.set('darckMode', !state.darkMode )
            return{...state, darkMode: !state.darkMode}
        case SET_ACTIVE_CITY: return { ...state, activeCityName: action.city}
        case TOGLE_DETEIL_WEATHER: return { ...state, dailyHourly: !state.dailyHourly }
        case SET_MODE: return {...state, darkMode:action.mode}
        default: return state
    }
}
export default GlobalSettingsReduser
export {chaingeActiveCityAC, TogleDetailWeatherAC, setModeAC, chaingeDarckModeAC }
