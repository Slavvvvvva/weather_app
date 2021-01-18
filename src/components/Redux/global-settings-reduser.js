let initialState = {
    darkMode : false,
}

const CHAINGE_DARK_MODE = 'CHAINGE_DARK_MODE'
const chaingeDarckModeAC = () => {
    return (
        {
            type: CHAINGE_DARK_MODE
        }
    )
}

const GlobalSettingsReduser = (state = initialState, action) => {
    switch (action.type) {
        case CHAINGE_DARK_MODE: return{...state, darkMode: !state.darkMode}
        default: return state
    }
}
export default GlobalSettingsReduser
export {chaingeDarckModeAC}