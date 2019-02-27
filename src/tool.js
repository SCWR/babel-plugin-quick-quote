// In order to avoid namespace duplication, it also prompts to use the babel plugin to convert

const error = new Error(`
  Please use the babel plugin (babel-plugin-quick-quote) to convert, do not use alias, use the correct parameter type.
  Please see this website (https://github.com/SCWR/babel-plugin-quick-quote#readme) for a detailed description.
`)

export const QUICK_QUOTE_KEY = '$_quickQuote'
export const QUICK_QUOTE_ASYNC_KEY = '$_quickQuoteAsync'

export const $_quickQuote = (arr, key) => error
export const $_quickQuoteAsync = (arr, key) => () => Promise.reject(error)
