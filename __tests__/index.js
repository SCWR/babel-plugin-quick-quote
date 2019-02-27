/* global it expect:true */
let babel = require('@babel/core')
let plugin = require('../lib/index.js')
let {QUICK_QUOTE_KEY, QUICK_QUOTE_ASYNC_KEY} = require('../lib/tool.js')

function transform (source) {
  return babel.transform(source, { presets: [], plugins: [plugin] })
}

const example = [
  `
    const echarts = ${QUICK_QUOTE_KEY}([
      'path/demo/path',
      'line',
      'bar'
    ])
  `,
  `
    const echarts = ${QUICK_QUOTE_KEY}([
      'line',
      'bar'
    ]), test = 'test';
  `,
  `
    ${QUICK_QUOTE_KEY}([
      'line',
      'bar'
    ])
  `,
  `
    const initEcharts = ${QUICK_QUOTE_ASYNC_KEY}([
      'line',
      'bar'
    ])
  `,
  `
    ${QUICK_QUOTE_ASYNC_KEY}([
      'line',
      'bar'
    ])
  `,
]

example.forEach((source) => {
  it(`${source} should works to`, () => {
    const { code } = transform(source)
    expect(code).toMatchSnapshot()
  })
})
