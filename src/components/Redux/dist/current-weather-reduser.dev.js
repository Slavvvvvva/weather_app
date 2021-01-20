"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCurrentWeatherAC = exports["default"] = exports.getCurrentWeatherTC = void 0;

var _weatherApi = require("../API/weather-api");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  CurrentWeather: null
};
var SET_CURRENT_WEATHER = 'SET_CURRENT_WEATHER';

var setCurrentWeatherAC = function setCurrentWeatherAC(weatherData) {
  return {
    type: SET_CURRENT_WEATHER,
    weatherData: weatherData
  };
};

exports.setCurrentWeatherAC = setCurrentWeatherAC;

var getCurrentWeatherTC = function getCurrentWeatherTC(cityName) {
  return function (dispatch) {
    (0, _weatherApi.getCarrentWeathaear)(cityName).then(function (responce) {
      dispatch(setCurrentWeatherAC(responce));
    });
  };
};

exports.getCurrentWeatherTC = getCurrentWeatherTC;

var WeatherReduser = function WeatherReduser() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case SET_CURRENT_WEATHER:
      return _objectSpread({}, state, {
        CurrentWeather: action.weatherData
      });

    default:
      return state;
  }
};

var _default = WeatherReduser;
exports["default"] = _default;