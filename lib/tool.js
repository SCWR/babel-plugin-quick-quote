"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$_quickQuoteAsync = exports.$_quickQuote = exports.QUICK_QUOTE_ASYNC_KEY = exports.QUICK_QUOTE_KEY = void 0;
// In order to avoid namespace duplication, it also prompts to use the babel plugin to convert
const error = new Error(`
  Please use the babel plugin (babel-plugin-quick-quote) to convert, do not use alias, use the correct parameter type.
  Please see this website (https://github.com/SCWR/babel-plugin-quick-quote#readme) for a detailed description.
`);
const QUICK_QUOTE_KEY = '$_quickQuote';
exports.QUICK_QUOTE_KEY = QUICK_QUOTE_KEY;
const QUICK_QUOTE_ASYNC_KEY = '$_quickQuoteAsync';
exports.QUICK_QUOTE_ASYNC_KEY = QUICK_QUOTE_ASYNC_KEY;

const $_quickQuote = (arr, key) => {
  throw error;
};

exports.$_quickQuote = $_quickQuote;

const $_quickQuoteAsync = (arr, key) => Promise.reject(error);

exports.$_quickQuoteAsync = $_quickQuoteAsync;