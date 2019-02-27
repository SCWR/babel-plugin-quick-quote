import path from 'path'
import fs from 'fs'
import {quickQuoteConfig} from '../quick-quote.config.js'
const ROOT_PATH = process.cwd()

export function loadConfig (key) {
  let config = quickQuoteConfig
  const configPath = path.resolve(ROOT_PATH, 'quick-quote.config.js')
  if (fs.existsSync(configPath)) {
    try {
      // eslint-disable-next-line global-require
      let userConfig = require(configPath)
      if (!userConfig || !userConfig.quickQuoteConfig) {
        console.log(`It is recommended to use the babel-plugin-quick-quote command,
        generate the corresponding configuration file(quick-quote.config.js) for the echarts version currently used by the project.
        https://github.com/SCWR/babel-plugin-quick-quote#readme`)
        config = userConfig.quickQuoteConfig
      }
    } catch (e) {
      console.log(e)
    }
  }
  return config[key]
}
