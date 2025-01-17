"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestParser = exports.default = void 0;
var _paramsToFormData = require("../../../frontend/hooks/use-record/params-to-form-data");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Takes the original ActionRequest and convert string values to a corresponding
 * types. It
 *
 * @param {ActionRequest} originalRequest
 * @param {BaseResource}  resource
 * @returns {ActionRequest}
 *
 * @private
 */
const requestParser = (originalRequest, resource) => {
  const {
    payload: originalPayload
  } = originalRequest;
  const payload = Object.entries(originalPayload || {}).reduce((memo, [path, formValue]) => {
    var _resource$_decorated;
    const property = (_resource$_decorated = resource._decorated) === null || _resource$_decorated === void 0 ? void 0 : _resource$_decorated.getPropertyByKey(path);
    let value = formValue;
    if (formValue === _paramsToFormData.FORM_VALUE_NULL) {
      value = null;
    }
    if (formValue === _paramsToFormData.FORM_VALUE_EMPTY_OBJECT) {
      value = {};
    }
    if (formValue === _paramsToFormData.FORM_VALUE_EMPTY_ARRAY) {
      value = [];
    }
    if (property) {
      if (property.type() === 'boolean') {
        if (value === 'true') {
          memo[path] = true;
          return memo;
        }
        if (value === 'false') {
          memo[path] = false;
          return memo;
        }
        if (value === '') {
          memo[path] = false;
          return memo;
        }
      }
      if (['date', 'datetime'].includes(property.type())) {
        if (value === '' || value === null) {
          memo[path] = null;
          return memo;
        }
      }
      if (property.type() === 'string') {
        const availableValues = property.availableValues();
        if (availableValues && !availableValues.includes(value) && value === '') {
          memo[path] = null;
          return memo;
        }
      }
    }
    memo[path] = value;
    return memo;
  }, {});
  return _objectSpread(_objectSpread({}, originalRequest), {}, {
    payload
  });
};
exports.requestParser = requestParser;
var _default = requestParser;
exports.default = _default;