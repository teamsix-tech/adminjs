"use strict";

var _factoryGirl = _interopRequireDefault(require("factory-girl"));
require("./property-json.factory");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
_factoryGirl.default.define('ResourceJSON', Object, {
  id: _factoryGirl.default.sequence('ResourceJSON.id', i => `resource${i}`),
  name: _factoryGirl.default.sequence('ResourceJSON.name', i => `resource ${i}`),
  href: '/admin/resourceName',
  titleProperty: () => _factoryGirl.default.build('PropertyJSON'),
  navigation: {
    name: 'someName',
    icon: 'someIcon',
    show: true
  },
  actions: [],
  resourceActions: [],
  listProperties: [],
  properties: {},
  showProperties: [],
  filterProperties: [],
  editProperties: []
});
_factoryGirl.default.extend('ResourceJSON', 'ResourceJSON.full', {}, {
  afterBuild: async model => {
    const properties = [await _factoryGirl.default.build('PropertyJSON', {
      name: 'name',
      isTitle: true
    }), await _factoryGirl.default.build('PropertyJSON', {
      name: 'surname'
    }), await _factoryGirl.default.build('PropertyJSON', {
      name: 'content',
      type: 'string'
    }), await _factoryGirl.default.build('PropertyJSON', {
      name: 'longerData',
      type: 'textarea'
    }),
    // await factory.build<PropertyJSON>('PropertyJSON', { name: 'publishedAt', type: 'date' }),
    await _factoryGirl.default.build('PropertyJSON', {
      name: 'gender',
      availableValues: [{
        label: 'male',
        value: 'MALE'
      }, {
        label: 'female',
        value: 'FEMALE'
      }]
    })];
    return _objectSpread(_objectSpread({}, model), {}, {
      listProperties: properties,
      showProperties: properties,
      editProperties: properties,
      filterProperties: properties
    });
  }
});