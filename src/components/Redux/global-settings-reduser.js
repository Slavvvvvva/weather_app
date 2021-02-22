import store from 'store'

let initialState = {
    darkMode : false,
    activeCityName: null,
    dailyHourly: false,
    appLanguage: 'en',
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
const setModeAC = (mode,lang) => {
    return (
        {
            type: SET_MODE,
            mode: mode,
            lang:lang
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
const TOGLE_LANGUAGE = 'TOGLE_LANGUAGE'
const togleLanguageAC = (lang) => {
    return (
        {
            type: TOGLE_LANGUAGE,
            lang: lang
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
        case SET_MODE: return {...state, darkMode: action.mode, appLanguage:action.lang }
        case TOGLE_LANGUAGE:
            store.set('appLanguage', action.lang )
            return{...state, appLanguage: action.lang, }
        default: return state
    }
}
export default GlobalSettingsReduser
export {chaingeActiveCityAC, TogleDetailWeatherAC, setModeAC, chaingeDarckModeAC, togleLanguageAC }
