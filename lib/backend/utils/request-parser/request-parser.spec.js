"use strict";

var _chai = require("chai");
var _requestParser = _interopRequireDefault(require("./request-parser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const buildResourceWithProperty = (key, property) => {
  const resource = {
    _decorated: {
      getPropertyByKey: path => key === path ? property : null
    }
  };
  return resource;
};
let resource;
describe('RequestParser', function () {
  const baseRequest = {
    params: {
      resourceId: 'resourceId',
      action: 'edit'
    },
    method: 'post',
    payload: {}
  };
  describe('boolean values', function () {
    beforeEach(function () {
      resource = buildResourceWithProperty('isHired', {
        type: () => 'boolean'
      });
    });
    it('sets value to `false` when empty string is given', function () {
      var _requestParser$payloa;
      const request = _objectSpread(_objectSpread({}, baseRequest), {}, {
        payload: {
          isHired: ''
        }
      });
      (0, _chai.expect)((_requestParser$payloa = (0, _requestParser.default)(request, resource).payload) === null || _requestParser$payloa === void 0 ? void 0 : _requestParser$payloa.isHired).to.be.false;
    });
    it('changes "true" string to true', function () {
      var _requestParser$payloa2;
      const request = _objectSpread(_objectSpread({}, baseRequest), {}, {
        payload: {
          isHired: 'true'
        }
      });
      (0, _chai.expect)((_requestParser$payloa2 = (0, _requestParser.default)(request, resource).payload) === null || _requestParser$payloa2 === void 0 ? void 0 : _requestParser$payloa2.isHired).to.be.true;
    });
    it('changes "false" string to true', function () {
      var _requestParser$payloa3;
      const request = _objectSpread(_objectSpread({}, baseRequest), {}, {
        payload: {
          isHired: 'false'
        }
      });
      (0, _chai.expect)((_requestParser$payloa3 = (0, _requestParser.default)(request, resource).payload) === null || _requestParser$payloa3 === void 0 ? void 0 : _requestParser$payloa3.isHired).to.be.false;
    });
  });
});