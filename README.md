# Babel Plugin Quick Quote [![Build Status][ci-img]][ci]

babel plugin quickly introduce the echarts module on demand

[ci-img]:  https://travis-ci.org/SCWR/babel-plugin-quick-quote.svg
[ci]:      https://travis-ci.org/SCWR/babel-plugin-quick-quote

```js
import {$_quickQuote, $_quickQuoteAsync} from 'babel-plugin-quick-quote/lib/tool'
$_quickQuote([
  'line',
  'bar'
])

// transform:
// import "echarts/lib/echarts";
// import "echarts/lib/chart/line";
// import "echarts/lib/chart/bar";
```

```js
//If there is no variable name, it will default to
// function getEchartsInstance()
$_quickQuoteAsync([
  'line',
  'bar'
])
// transform:
// let $_QuickQuote_echartsInstance = null;
// function getEchartsInstance() {
//   if (!$_QuickQuote_echartsInstance) {
//     $_QuickQuote_echartsInstance = import( /* webpackChunkName: \\"echarts\\" */ 'echarts/lib/echarts').then(echarts => {
//       return Promise.all([echarts,
//       import( /* webpackChunkName: \\"echarts\\" */ 'echarts/lib/chart/line'),
//       import(/* webpackChunkName: \\"echarts\\" */'echarts/lib/chart/bar')]).then(([echarts]) => echarts);
//     });
//   }
//   return $_QuickQuote_echartsInstance;
// }
```

```js
const echarts = $_quickQuote([
  'line',
  'bar'
]), test = 'test';
// transform:
// import echarts from "echarts/lib/echarts";
// import "echarts/lib/chart/line";
// import "echarts/lib/chart/bar";
// const test = 'test';
```

```js
// If there is no corresponding configuration in the configuration file quick-quote.config.js, output will be as it is.
const echarts = $_quickQuote([
  'path/demo/path',
  'line',
  'bar'
])

// transform:
// import echarts from "echarts/lib/echarts";
// import "path/demo/path";
// import "echarts/lib/chart/line";
// import "echarts/lib/chart/bar";
```

```js
const initEcharts = $_quickQuoteAsync([
  'line',
  'bar'
])
// transform:
// let $_QuickQuote_echartsInstance = null;
// function initEcharts() {
//   if (!$_QuickQuote_echartsInstance) {
//     $_QuickQuote_echartsInstance = import( /* webpackChunkName: \\"echarts\\" */ 'echarts/lib/echarts').then(echarts => {
//       return Promise.all([echarts,
//       import( /* webpackChunkName: \\"echarts\\" */ 'echarts/lib/chart/line'),
//       import(/* webpackChunkName: \\"echarts\\" */'echarts/lib/chart/bar')]).then(([echarts]) => echarts);
//     });
//   }
//   return $_QuickQuote_echartsInstance;
// }
```

## Usage

```js
//.babelrc
{
  "plugins": [
    // 'babal-plugin-quick-quote'
    "quick-quote"
  ]
}
```

```js
//babel.config.js
module.exports = {
  plugins: [
    // 'babal-plugin-quick-quote'
    'quick-quote'
  ]
}
```

> use the babel-plugin-quick-quote command, generate the corresponding configuration file(quick-quote.config.js) for the echarts version currently used by the project.

```code
babal-plugin-quick-quote
```
