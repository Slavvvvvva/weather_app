import {combineReducers, createStore, applyMiddleware,compose} from "redux";
import thunkMiddleware from 'redux-thunk'
import GlobalSettingsReduser from "./global-settings-reduser";
//import {reducer as formReducer} from 'redux-form' 


let redusers = combineReducers({
    GlobalSettings: GlobalSettingsReduser,
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(redusers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunkMiddleware)
    ));
export default store