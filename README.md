# Delete Key
[![Build Status](https://travis-ci.org/flexdinesh/del-key.svg?branch=master)](https://travis-ci.org/flexdinesh/del-key)
[![npm version](https://badge.fury.io/js/del-key.svg)](https://www.npmjs.com/package/del-key)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Delete a key from a deeply nested JavaScript object.

## Why? [![start with why](https://img.shields.io/badge/start%20with-why%3F-brightgreen.svg?style=flat)](http://www.ted.com/talks/simon_sinek_how_great_leaders_inspire_action)

There are a few other libs that already aid in deleting keys from objects. But none of them iteratively deletes the key if one of the nested objects is an _array_.

The following are the highlights of this `delete-key` library.
  - Traverses through the exact path for maximum performance. Does not iterate over the keys to detect presence.
  - Support for arrays in object path. Keys will be iteratively removed from each item in the array. *(This is where `del-key` differs from lodash's `_.unset()` method)*
  - Accepts array index in path definition.
  - Mutates the object.


## Install

```
$ npm install --save del-key
```

## Usage

### Syntax

**deleteKey(obj, pathToDelete)**

_obj_ - the object that has the key to be deleted

_pathToDelete_ - the path to the key in the object in string notation

_See examples below for more info_.


### Examples

```js
import deleteKey from 'del-key'; // ES6 style import
// const deleteKey = require('del-key'); // ES5 style import

const obj = {
  nestedKey: {
    poorKey: 'hello',
    luckyKey: 'hi'
  }
}
deleteKey(obj, 'nestedKey.poorKey') // =>obj.nestedKey = { luckyKey: 'hi' }
//------------------------------------

const obj = {
  nestedArray: [{
    poorKey: 'first hello',
    luckyKey: 'first hi'
  }, {
    poorKey: 'second hello',
    luckyKey: 'second hi'
  }]
}
deleteKey(obj, 'nestedArray[0].poorKey')
// =>obj.nestedArray[0] = { luckyKey: 'first hi' }
// =>obj.nestedArray[1] = { poorKey: 'second hello', luckyKey: 'first hi' }
//------------------------------------

const obj = {
  nestedArray: [{
    poorKey: 'first hello',
    luckyKey: 'first hi'
  }, {
    poorKey: 'second hello',
    luckyKey: 'second hi'
  }]
}
deleteKey(obj, 'nestedArray.poorKey') // => iteratively removes poorKey from each item in nestedArray
// =>obj.nestedArray[0] = { luckyKey: 'first hi' }
// =>obj.nestedArray[1] = { luckyKey: 'first hi' }

```


## License

MIT © Dineshkumar Pandiyan
