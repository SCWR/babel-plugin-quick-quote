/**
* babel-plugin-quick-quote https://github.com/SCWR/babel-plugin-quick-quote#readme
* package.json config
* "scripts": {
*   ...
*   "generate": "babel-plugin-quick-quote",
*   ...
* }
* if quickOuoteConfig is empty object, please install dependencies [echarts] before using the command [babel-plugin-quick-quote]
*/
exports.quickQuoteConfig = {
  // echarts version: 4.1.0
  echarts: {
    // path: echarts/lib/chart
    chart: [
      'bar',
      'boxplot',
      'candlestick',
      'chord',
      'custom',
      'effectScatter',
      'funnel',
      'gauge',
      'graph',
      'heatmap',
      'line',
      'lines',
      'map',
      'parallel',
      'pictorialBar',
      'pie',
      'radar',
      'sankey',
      'scatter',
      'sunburst',
      'themeRiver',
      'tree',
      'treemap',
    ],
    // path: echarts/lib/component
    component: [
      'angleAxis',
      'axis',
      'axisPointer',
      'brush',
      'calendar',
      'dataset',
      'dataZoom',
      'dataZoomInside',
      'dataZoomSelect',
      'geo',
      'graphic',
      'grid',
      'gridSimple',
      'legend',
      'legendScroll',
      'markArea',
      'markLine',
      'markPoint',
      'parallelAxis',
      'polar',
      'radiusAxis',
      'singleAxis',
      'timeline',
      'title',
      'toolbox',
      'tooltip',
      'visualMap',
      'visualMapContinuous',
      'visualMapPiecewise',
    ],
  },
}
