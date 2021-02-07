"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TogleDetailWeatherAC = exports.chaingeActiveCityAC = exports.chaingeDarckModeAC = exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  darkMode: false,
  activeCityName: null,
  dailyHourly: false
};
var CHAINGE_DARK_MODE = 'CHAINGE_DARK_MODE';

var chaingeDarckModeAC = function chaingeDarckModeAC() {
  return {
    type: CHAINGE_DARK_MODE
  };
};

exports.chaingeDarckModeAC = chaingeDarckModeAC;
var SET_ACTIVE_CITY = 'SET_ACTIVE_CITY';

var chaingeActiveCityAC = function chaingeActiveCityAC(city) {
  return {
    type: SET_ACTIVE_CITY,
    city: city
  };
};

exports.chaingeActiveCityAC = chaingeActiveCityAC;
var TOGLE_DETEIL_WEATHER = 'TOGLE_DETEIL_WEATHER';

var TogleDetailWeatherAC = function TogleDetailWeatherAC() {
  return {
    type: TOGLE_DETEIL_WEATHER
  };
};

exports.TogleDetailWeatherAC = TogleDetailWeatherAC;

var GlobalSettingsReduser = function GlobalSettingsReduser() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case CHAINGE_DARK_MODE:
      return _objectSpread({}, state, {
        darkMode: !state.darkMode
      });

    case SET_ACTIVE_CITY:
      return _objectSpread({}, state, {
        activeCityName: action.city
      });

    case TOGLE_DETEIL_WEATHER:
      return _objectSpread({}, state, {
        dailyHourly: !state.dailyHourly
      });

    default:
      return state;
  }
};

var _default = GlobalSettingsReduser;
exports["default"] = _default;