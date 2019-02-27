"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = require("../config.js");

const defConfig = (0, _config.loadConfig)('echarts');
const ROOT_MODULES_PATH = 'echarts/lib/echarts';
const DEF_FUN_NAME = 'getEchartsInstance';
const modulesMap = {};
const groups = ['chart', 'component'];

for (let group of groups) {
  defConfig[group].forEach(moduleName => {
    modulesMap[moduleName] = group;
  });
}

function getModulePath(moduleName) {
  if (!modulesMap[moduleName]) {
    // user custom path
    return moduleName;
  } else {
    return `echarts/lib/${modulesMap[moduleName]}/${moduleName}`;
  }
}

function build(name, quote, {
  types: t
}) {
  const {
    elements
  } = quote;
  let importDefaultSpecifiers = name ? [t.importDefaultSpecifier(t.identifier(name))] : [];
  return [t.importDeclaration(importDefaultSpecifiers, t.stringLiteral(ROOT_MODULES_PATH)), ...elements.map(element => t.importDeclaration([], t.stringLiteral(getModulePath(element.value))))];
}

function buildAsync(name = DEF_FUN_NAME, quote, {
  template
}, variableName) {
  const {
    elements
  } = quote;
  const requiredModules = elements.map(element => `import(/* webpackChunkName: "echarts" */ '${getModulePath(element.value)}')`).join(',');
  const declarations = template(`
  let ${variableName} = null
    function ${name} () {
      if (!${variableName}) {
        ${variableName} = import(/* webpackChunkName: "echarts" */ '${ROOT_MODULES_PATH}')
          .then(echarts => {
            return Promise.all([
              echarts,
              ${requiredModules}
            ]).then(([echarts]) => echarts)
          })
      }
      return ${variableName}
    }
  `, {
    plugins: ['dynamicImport'],
    preserveComments: true
  })();
  return declarations;
}

function getDeclarationsByVariableDeclaration(name, quote, babel, variableName, isAsync) {
  return !isAsync ? build(name, quote, babel) : buildAsync(name, quote, babel, variableName);
}

const echartsHander = {
  getDeclarationsByVariableDeclaration
};
var _default = echartsHander;
exports.default = _default;