#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const echartsGenerate = require('../lib/generate/echartsGenerate.js')

const ROOT_PATH = process.cwd()
const MODULES_PATH = path.resolve(ROOT_PATH, 'node_modules')
const OUTPUT_PATH = path.resolve(ROOT_PATH, 'quick-quote.config.js')

function getIndents (num = 0, indent = '  ') {
  return new Array(num).fill(indent).join('')
}

function handleConfig (config, level = 0) {
  const result = []
  for (let [key, {remark, content}] of Object.entries(config)) {
    if (remark) {
      result.push(`${getIndents(level)}${remark}`)
    }
    if (content instanceof Array) {
      result.push(`${getIndents(level)}${key}: [`)
      result.push(...content.map((value) => `${getIndents(level + 1)}'${value}',`))
      result.push(`${getIndents(level)}],`)
    } else if (content instanceof Object) {
      result.push(`${getIndents(level)}${key}: {`)
      result.push(...handleConfig(content, level + 1))
      result.push(`${getIndents(level)}},`)
    }
  }
  return result
}

let output = [
  `/**
* babel-plugin-quick-quote https://github.com/SCWR/babel-plugin-quick-quote#readme
* package.json config
* "scripts": {
*   ...
*   "generate": "babel-plugin-quick-quote",
*   ...
* }
*/
exports.quickQuoteConfig = {`]

if (!fs.existsSync(MODULES_PATH)) {
  console.log('cannot find node_modules folder, please run this command in the project root path')
  return
}

console.log('generating modules to quick-quote.config.js...')
output.push(...handleConfig(echartsGenerate.getConfig(MODULES_PATH), 1))
output.push('}\n')
fs.writeFileSync(OUTPUT_PATH, output.join('\n'))
console.log('quick-quote.config.js generated success!')
