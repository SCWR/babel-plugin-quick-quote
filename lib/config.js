"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadConfig = loadConfig;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _quickQuoteConfig = require("../quick-quote.config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ROOT_PATH = process.cwd();

function loadConfig(key) {
  let defConfig = _quickQuoteConfig.quickQuoteConfig;
  let userConfig = {};

  const configPath = _path.default.resolve(ROOT_PATH, 'quick-quote.config.js');

  if (_fs.default.existsSync(configPath)) {
    try {
      // eslint-disable-next-line global-require
      let config = require(configPath);

      if (!config || !config.quickQuoteConfig) {
        console.log(`It is recommended to use the babel-plugin-quick-quote command,
        generate the corresponding configuration file(quick-quote.config.js) for the echarts version currently used by the project.
        https://github.com/SCWR/babel-plugin-quick-quote#readme`);
        userConfig = config.quickQuoteConfig;
      }
    } catch (e) {
      console.log(e);
    }
  }

  return userConfig[key] || defConfig[key] || {};
}