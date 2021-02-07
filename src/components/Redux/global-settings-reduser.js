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
        case CHAINGE_DARK_MODE: return{...state, darkMode: !state.darkMode}
        case SET_ACTIVE_CITY: return { ...state, activeCityName: action.city}
        case TOGLE_DETEIL_WEATHER: return { ...state, dailyHourly: !state.dailyHourly }
        default: return state
    }
}
export default GlobalSettingsReduser
export {chaingeDarckModeAC}
export {chaingeActiveCityAC, TogleDetailWeatherAC}
