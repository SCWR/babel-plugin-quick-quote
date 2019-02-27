// https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md
// https://astexplorer.net/
import {QUICK_QUOTE_KEY, QUICK_QUOTE_ASYNC_KEY} from './tool.js'
import echartsHandler from './handler/echartsHandler.js'

const PREFIX_KEY = '$_QuickQuote_'
const SUFFIX_KEY = 'Instance'

const defaultFor = 'echarts'
const pluginsFor = {'echarts': echartsHandler}

function isSpecified ({callee}) {
  return ([QUICK_QUOTE_KEY, QUICK_QUOTE_ASYNC_KEY].includes(callee.name))
}

export default function quickQuote (babel) {
  let { types: t } = babel
  return {
    visitor: {
      VariableDeclaration (path) {
        let {node} = path
        let {declarations} = node
        let handlesIndex = []
        let handles = []
        declarations.forEach(({id, init}, index) => {
          if (init && t.isCallExpression(init) && isSpecified(init)) {
            let [quotes, key = {name: defaultFor}] = init.arguments
            let handler = pluginsFor[key.name]
            if (handler && t.isArrayExpression(quotes)) {
              handlesIndex.push(index)
              handles.push(...handler.getDeclarationsByVariableDeclaration(id.name, quotes, babel,
                `${PREFIX_KEY}${key.name}${SUFFIX_KEY}`, init.callee.name === QUICK_QUOTE_ASYNC_KEY))
            }
          }
        })
        if (handles.length) {
          if (declarations.length !== handlesIndex.length) {
            handles.push(t.variableDeclaration(node.kind,
              declarations.filter((declaration, index) => !handlesIndex.includes(index))))
          }
          path.replaceWithMultiple(handles)
        }
      },
      ExpressionStatement (path) {
        let {node} = path
        let {expression} = node
        if (expression && t.isCallExpression(expression) && isSpecified(expression)) {
          let [quotes, key = {name: defaultFor}] = expression.arguments
          let handler = pluginsFor[key.name]
          if (handler && t.isArrayExpression(quotes)) {
            path.replaceWithMultiple((handler.getDeclarationsByVariableDeclaration(undefined, quotes, babel,
              `${PREFIX_KEY}${key.name}${SUFFIX_KEY}`, expression.callee.name === QUICK_QUOTE_ASYNC_KEY)))
          }
        }
      },
    },
  }
}

