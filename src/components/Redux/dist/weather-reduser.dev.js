"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delCurrentWeatherAC = exports.setCurrentWeatherAC = exports["default"] = exports.getCNTDaysWeatherTC = exports.getCurrentWeatherIdTC = exports.getCurrentWeatherTC = void 0;

var _weatherApi = require("../API/weather-api");

var _store = _interopRequireDefault(require("store"));

var _reduxForm = require("redux-form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  CurrentWeather: [],
  CNTdaysWeather: []
};
var SET_CURRENT_WEATHER = 'SET_CURRENT_WEATHER';

var setCurrentWeatherAC = function setCurrentWeatherAC(weatherData) {
  return {
    type: SET_CURRENT_WEATHER,
    weatherData: weatherData
  };
};

exports.setCurrentWeatherAC = setCurrentWeatherAC;
var SET_CNTDAYS_WEATHER = 'SET_CNTDAYS_WEATHER';

var setCNTDaysWeatherAC = function setCNTDaysWeatherAC(weatherData) {
  return {
    type: SET_CNTDAYS_WEATHER,
    weatherData: weatherData
  };
};

var DELATE_CURRENT_WEATHER = 'DELATE_CURRENT_WEATHER';

var delCurrentWeatherAC = function delCurrentWeatherAC(id) {
  return {
    type: DELATE_CURRENT_WEATHER,
    id: id
  };
};

exports.delCurrentWeatherAC = delCurrentWeatherAC;

var getCurrentWeatherTC = function getCurrentWeatherTC(cityName, lang) {
  return function (dispatch) {
    (0, _weatherApi.getCarrentWeathaear)(cityName, lang).then(function (responce) {
      if (responce.cod === 200) {
        var citymass = _store["default"].get('city');

        var chackDoubleCard = function chackDoubleCard() {
          var citymass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

          if (citymass.every(function (i) {
            return i !== responce.id;
          })) {
            citymass.push(responce.id);
            dispatch(setCurrentWeatherAC(responce));

            _store["default"].set('city', citymass);

            dispatch((0, _reduxForm.reset)('AddCity'));
          } else {
            dispatch((0, _reduxForm.stopSubmit)('AddCity', {
              'cityName': 'you already add this city'
            }));
          }
        };

        chackDoubleCard(citymass);
      }
    })["catch"](function (responce) {
      console.log(responce);
      dispatch((0, _reduxForm.stopSubmit)('AddCity', {
        'cityName': 'city not found'
      }));
    });
  };
};

exports.getCurrentWeatherTC = getCurrentWeatherTC;

var getCurrentWeatherIdTC = function getCurrentWeatherIdTC(cityid, lang) {
  return function (dispatch) {
    (0, _weatherApi.getCarrentWeathaearId)(cityid, lang).then(function (responce) {
      dispatch(setCurrentWeatherAC(responce));

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

exports.getCurrentWeatherIdTC = getCurrentWeatherIdTC;

var getCNTDaysWeatherTC = function getCNTDaysWeatherTC(lat, lon, lang) {
  return function (dispatch) {
    (0, _weatherApi.getCNTdaysWeathaearId)(lat, lon, lang).then(function (responce) {
      dispatch(setCNTDaysWeatherAC(responce));
    });
  };
};

exports.getCNTDaysWeatherTC = getCNTDaysWeatherTC;

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

    case SET_CNTDAYS_WEATHER:
      return _objectSpread({}, state, {
        CNTdaysWeather: action.weatherData
      });

    case DELATE_CURRENT_WEATHER:
      var citymass = _store["default"].get('city');

      _store["default"].set('city', citymass.filter(function (item) {
        return item !== action.id;
      }));

      return _objectSpread({}, state, {
        CurrentWeather: state.CurrentWeather.filter(function (item) {
          return item.id !== action.id;
        })
      });

    default:
      return state;
  }
};

var _default = WeatherReduser;
exports["default"] = _default;