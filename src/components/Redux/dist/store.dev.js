"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _globalSettingsReduser = _interopRequireDefault(require("./global-settings-reduser"));

var _weatherReduser = _interopRequireDefault(require("./weather-reduser"));

var _reduxForm = require("redux-form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var redusers = (0, _redux.combineReducers)({
  GlobalSettings: _globalSettingsReduser["default"],
  Weather: _weatherReduser["default"],
  form: _reduxForm.reducer
});
var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
var store = (0, _redux.createStore)(redusers,
/* preloadedState, */
composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk["default"])));
var _default = store;
exports["default"] = _default;