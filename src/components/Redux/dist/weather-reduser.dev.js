"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCurrentWeatherAC = exports["default"] = exports.getCurrentWeatherTC = void 0;

var _weatherApi = require("../API/weather-api");

var _store = _interopRequireDefault(require("store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  CurrentWeather: []
};
var SET_CURRENT_WEATHER = 'SET_CURRENT_WEATHER';

var setCurrentWeatherAC = function setCurrentWeatherAC(city, weatherData) {
  return {
    type: SET_CURRENT_WEATHER,
    city: city,
    weatherData: weatherData
  };
};

exports.setCurrentWeatherAC = setCurrentWeatherAC;

var getCurrentWeatherTC = function getCurrentWeatherTC(cityName) {
  return function (dispatch) {
    (0, _weatherApi.getCarrentWeathaear)(cityName).then(function (responce) {
      dispatch(setCurrentWeatherAC(cityName, responce));

      var citymass = _store["default"].get('city');

      if (citymass) {
        if (citymass.every(function (i) {
          return i !== responce.id;
        })) {
          citymass.push(responce.id);
        }
      } else {
        citymass = [];
        citymass.push(responce.id);
      }

      _store["default"].set('city', citymass);
    });
  };
};

exports.getCurrentWeatherTC = getCurrentWeatherTC;

var WeatherReduser = function WeatherReduser() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case SET_CURRENT_WEATHER:
      {
        var stateCopy = _objectSpread({}, state);

        stateCopy.CurrentWeather = _toConsumableArray(state.CurrentWeather);
        stateCopy.CurrentWeather.push(action.weatherData);
        return stateCopy;
      }

    default:
      return state;
  }
};

var _default = WeatherReduser;
exports["default"] = _default;