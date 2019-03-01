# Babel Plugin Quick Quote

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
<!-- [![Node.js Version][node-version-image]][node-version-url] -->
[![Build Status][travis-ci-image]][travis-ci-url]

babel plugin quickly introduce the echarts module on demand

[npm-image]: https://img.shields.io/npm/v/babel-plugin-quick-quote.svg
[npm-url]: https://npmjs.org/package/babel-plugin-quick-quote
<!-- [node-version-image]: https://img.shields.io/node/v/babel-plugin-quick-quote.svg
[node-version-url]: http://nodejs.org/download/ -->
[downloads-image]: https://img.shields.io/npm/dm/babel-plugin-quick-quote.svg
[downloads-url]: https://npmjs.org/package/babel-plugin-quick-quote
[travis-ci-image]:  https://travis-ci.org/SCWR/babel-plugin-quick-quote.svg
[travis-ci-url]:    https://travis-ci.org/SCWR/babel-plugin-quick-quote

```js
import {$_quickQuote} from 'babel-plugin-quick-quote/lib/tool'
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
// If there is no corresponding configuration in the configuration file quick-quote.config.js,
// output will be as it is.
import {$_quickQuote} from 'babel-plugin-quick-quote/lib/tool'
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
import {$_quickQuote} from 'babel-plugin-quick-quote/lib/tool'
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
import {$_quickQuoteAsync} from 'babel-plugin-quick-quote/lib/tool'
const initEcharts = $_quickQuoteAsync([
  'line',
  'bar'
])
// transform:
// let $_QuickQuote_echartsInstance = null;
// function initEcharts() {
//   if (!$_QuickQuote_echartsInstance) {
//     $_QuickQuote_echartsInstance =
//       import( /* webpackChunkName: \\"echarts\\" */ 'echarts/lib/echarts').
//         then(echarts => {
//         return Promise.all([echarts,
//         import( /* webpackChunkName: \\"echarts\\" */ 'echarts/lib/chart/line'),
//         import(/* webpackChunkName: \\"echarts\\" */'echarts/lib/chart/bar')]).
//         then(([echarts]) => echarts);
//     });
//   }
//   return $_QuickQuote_echartsInstance;
// }
```

```js
//If there is no variable name, it will default to
// function getEchartsInstance()
import {$_quickQuoteAsync} from 'babel-plugin-quick-quote/lib/tool'
$_quickQuoteAsync([
  'line',
  'bar'
])
// transform:
// let $_QuickQuote_echartsInstance = null;
// function getEchartsInstance() {
//   if (!$_QuickQuote_echartsInstance) {
//     $_QuickQuote_echartsInstance =
//       import( /* webpackChunkName: \\"echarts\\" */ 'echarts/lib/echarts').
//         then(echarts => {
//         return Promise.all([echarts,
//         import( /* webpackChunkName: \\"echarts\\" */ 'echarts/lib/chart/line'),
//         import(/* webpackChunkName: \\"echarts\\" */'echarts/lib/chart/bar')]).
//         then(([echarts]) => echarts);
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
