"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = build;
exports.outPath = void 0;
var fs = _interopRequireWildcard(require("fs"));
var path = _interopRequireWildcard(require("path"));
var util = _interopRequireWildcard(require("util"));
var _bundler = _interopRequireDefault(require("./bundler"));
var _generateUserComponentEntry = _interopRequireDefault(require("./generate-user-component-entry"));
var _constants = require("../../constants");
var _bundlerEnv = _interopRequireDefault(require("./bundler-env"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const entryPath = path.join(_constants.ADMIN_JS_TMP_DIR, '.entry.js');
const outPath = path.join(_constants.ADMIN_JS_TMP_DIR, 'bundle.js');
exports.outPath = outPath;
async function build(admin, {
  write = false,
  watch = false
} = {}) {
  const {
    options: {
      bundler: bundlerOptions
    }
  } = admin;
  const entryFile = (0, _generateUserComponentEntry.default)(admin, _constants.ADMIN_JS_TMP_DIR);
  try {
    await util.promisify(fs.mkdir)(_constants.ADMIN_JS_TMP_DIR, {
      recursive: true
    });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }

  // if components bundle was requested and there are already bundled - return
  // that instead of bundling them again
  if (!write) {
    try {
      const existingBundle = await util.promisify(fs.readFile)(outPath, 'utf-8');
      return existingBundle;
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
  }
  await util.promisify(fs.writeFile)(entryPath, entryFile);
  const output = await (0, _bundler.default)(_objectSpread({
    name: 'AdminJSCustom',
    input: entryPath,
    watch,
    file: write ? outPath : null,
    minify: _bundlerEnv.default === 'production'
  }, bundlerOptions));
  let jsOutput = output.code;
  if (output.map) {
    jsOutput += `
//# sourceMappingURL=data:application/json;charset=utf-8;base64,${Buffer.from(JSON.stringify(output.map)).toString('base64')}
    `;
  }
  return jsOutput;
}