"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCNTdaysWeathaearId = exports.getCarrentWeathaearId = exports.getCarrentWeathaear = void 0;

var axios = _interopRequireWildcard(require("axios"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var instanse = axios.create({
  withCredentials: false,
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  params: {
    appid: 'acf754624f6162ea7af2d33749af05cb',
    units: 'metric'
  }
});

var getCarrentWeathaear = function getCarrentWeathaear(cityName) {
  var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
  return instanse.get("weather?q=".concat(cityName, "&lang=").concat(lang)).then(function (response) {
    return response.data;
  });
};

exports.getCarrentWeathaear = getCarrentWeathaear;

var getCarrentWeathaearId = function getCarrentWeathaearId(cityID) {
  var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
  return instanse.get("weather?id=".concat(cityID, "&lang=").concat(lang)).then(function (response) {
    return response.data;
  });
};

exports.getCarrentWeathaearId = getCarrentWeathaearId;

var getCNTdaysWeathaearId = function getCNTdaysWeathaearId(lat, lon) {
  var lang = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'en';
  return instanse.get("onecall?lat=".concat(lat, "&lon=").concat(lon, "&lang=").concat(lang)).then(function (response) {
    return response.data;
  });
};

exports.getCNTdaysWeathaearId = getCNTdaysWeathaearId;