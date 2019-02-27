import path from 'path'
import fs from 'fs'

function handleConsole (msg, ex = '') {
  return `\n${ex && `${ex} `}${msg}${ex && ` ${ex}`}\n`
}

export function getConfig (modulesPath) {
  const BASE_PATH = 'echarts/lib'
  const TRAVALSE_DIRS = ['chart', 'component']
  const config = {}
  console.log(handleConsole('start processing echarts module', '------'))
  let version = ''
  let isInstall = true
  try {
    // eslint-disable-next-line global-require
    let echarts = require(`${BASE_PATH}/echarts`)
    version = echarts.version
    console.log(handleConsole(`current version of echarts is ${version}`))
  } catch (e) {
    console.log(handleConsole('please install dependencies echarts'))
    isInstall = false
  }
  if (isInstall) {
    let modules = {}
    let includeNames = []
    TRAVALSE_DIRS.forEach((dir) => {
      const files = fs.readdirSync(path.resolve(modulesPath, BASE_PATH, dir))
      modules[dir] = {
        remark: `// path: ${BASE_PATH}/${dir}`,
        content: [],
      }
      files.forEach((file) => {
        if (file.slice(-3) === '.js') {
          const filename = file.slice(0, -3)
          if (includeNames.includes(filename)) {
            return
          }
          includeNames.push(filename)
          modules[dir].content.push(filename)
        }
      })
    })
    config.echarts = {
      remark: `// echarts version: ${version}`,
      content: modules,
    }
  }
  console.log(handleConsole('end processing echarts module', '------'))
  return config
}
