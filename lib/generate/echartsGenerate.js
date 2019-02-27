"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfig = getConfig;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getConfig(modulesPath) {
  const BASE_PATH = 'echarts/lib';
  const TRAVALSE_DIRS = ['chart', 'component'];
  const config = {};
  console.log('start processing echarts module');
  let version = '';

  try {
    // eslint-disable-next-line global-require
    let echarts = require(`${BASE_PATH}/echarts`);

    version = echarts.version;
    console.log(`current version of echarts is ${version}`);
  } catch (e) {
    console.log('the project does not install dependencies echarts');
    return config;
  }

  let modules = {};
  let includeNames = [];
  TRAVALSE_DIRS.forEach(dir => {
    const files = _fs.default.readdirSync(_path.default.resolve(modulesPath, BASE_PATH, dir));

    modules[dir] = {
      remark: `// path: ${BASE_PATH}/${dir}`,
      content: []
    };
    files.forEach(file => {
      if (file.slice(-3) === '.js') {
        const filename = file.slice(0, -3);

        if (includeNames.includes(filename)) {
          return;
        }

        includeNames.push(filename);
        modules[dir].content.push(filename);
      }
    });
  });
  config.echarts = {
    remark: `// echarts version: ${version}`,
    content: modules
  };
  console.log('end processing echarts module');
  return config;
}