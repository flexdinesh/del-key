/* eslint-disable no-console */
const deleteKey = require('../lib');

const obj = {
  nestedKey: {
    deepKey: 'hello'
  }
};

deleteKey(obj, 'nestedKey.deepKey');
console.log(obj); // => { nestedKey: {} }
// deepKey will be removed from obj.nestedKey
