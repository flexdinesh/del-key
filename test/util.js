import { assert } from 'chai';
import {
  deleteKey,
  stripFirstKeyFromPath,
  stripTrailingKeysFromPath,
  traverseAndDelete,
  stripKeyFromArrayPath,
  stripArrayIndexFromArrayPath
} from '../src/util';

describe('Util', () => {
  describe('Delete object key in object', () => {
    it('should delete key', () => {
      const obj = {
        myKey: 'hello'
      };
      const mutatedObj = deleteKey(obj, 'myKey');
      assert.deepEqual(mutatedObj, {});
    });

    it('should delete key with array index', () => {
      const obj = {
        myArr: [
          {
            myKey: 'key one'
          }, {
            myKey: 'key two'
          }
        ]
      };
      const mutatedObj = deleteKey(obj, 'myArr[0]');
      assert.deepEqual(mutatedObj, {
        myArr: [
          {
            myKey: 'key two'
          }
        ]
      });
    });

    it('should not delete key with wrong array index', () => {
      const obj = {
        myArr: [
          { myKey: 'key one' },
          { myKey: 'key two' }
        ]
      };
      const mutatedObj = deleteKey(obj, 'myArr[4]');
      assert.deepEqual(mutatedObj, {
        myArr: [
          { myKey: 'key one' },
          { myKey: 'key two' }
        ]
      });
    });
  });

  describe('First key', () => {
    it('should return first key from key path', () => {
      let keyPath = 'deeplyNestedPath.nestedPath.awesomeKey';
      assert(stripFirstKeyFromPath(keyPath) === 'deeplyNestedPath');
      keyPath = 'awesomeKey';
      assert(stripFirstKeyFromPath(keyPath) === 'awesomeKey');
      keyPath = '';
      assert(stripFirstKeyFromPath(keyPath) === '');
      keyPath = null;
      assert(stripFirstKeyFromPath(keyPath) === '');
    });
  });

  describe('Trailing keys', () => {
    it('should return trailing keys from key path', () => {
      let keyPath = 'deeplyNestedPath.nestedPath.awesomeKey';
      assert(stripTrailingKeysFromPath(keyPath) === 'nestedPath.awesomeKey');
      keyPath = 'nestedPath.awesomeKey';
      assert(stripTrailingKeysFromPath(keyPath) === 'awesomeKey');
      keyPath = 'awesomeKey';
      assert(stripTrailingKeysFromPath(keyPath) === '');
      keyPath = '';
      assert(stripTrailingKeysFromPath(keyPath) === '');
      keyPath = null;
      assert(stripTrailingKeysFromPath(keyPath) === '');
    });
  });

  describe('Key from array str path', () => {
    it('should return key from array path', () => {
      assert(stripKeyFromArrayPath('key[0]') === 'key');
    });
  });

  describe('Array index from array str path', () => {
    it('should return array index from array path', () => {
      assert(stripArrayIndexFromArrayPath('key[0]') === 0);
      assert(stripArrayIndexFromArrayPath('key[22]') === 22);
    });
  });

  describe('Traverse and Delete', () => {
    it('should delete last key in simple path', () => {
      let obj = {
        myKey: 'hello'
      };
      let mutatedObj = traverseAndDelete(obj, 'myKey');
      assert.deepEqual(mutatedObj, {});

      obj = {
        myKey: []
      };
      mutatedObj = traverseAndDelete(obj, 'myKey');
      assert.deepEqual(mutatedObj, {});
    });

    it('should delete last key in path with array index', () => {
      const obj = {
        arrKey: [
          {
            myKey: 'key one',
            anotherKey: 'another key one'
          },
          {
            myKey: 'key two',
            anotherKey: 'another key two'
          }
        ]
      };
      const mutatedObj = traverseAndDelete(obj, 'arrKey[0].myKey');
      assert.deepEqual(mutatedObj, {
        arrKey: [
          {
            anotherKey: 'another key one'
          },
          {
            myKey: 'key two',
            anotherKey: 'another key two'
          }
        ]
      });
    });

    it('should delete last key in path with array index ', () => {
      const obj = {
        arrKey: [
          {
            myKey: 'key one',
            anotherKey: 'another key one'
          },
          {
            myKey: 'key two',
            anotherKey: 'another key two'
          }
        ]
      };
      const mutatedObj = traverseAndDelete(obj, 'arrKey[0]');
      assert.deepEqual(mutatedObj, {
        arrKey: [
          {
            myKey: 'key two',
            anotherKey: 'another key two'
          }
        ]
      });
    });

    it('should traverse and delete last key in nested path', () => {
      let obj = {
        deeplyNestedPath: {
          nestedPath: {
            awesomeKey: 'hello'
          }
        }
      };
      let mutatedObj = traverseAndDelete(obj, 'deeplyNestedPath.nestedPath.awesomeKey');
      assert.deepEqual(mutatedObj, {
        deeplyNestedPath: {
          nestedPath: {}
        }
      });

      obj = {
        deeplyNestedPath: {
          nestedPath: {
            awesomeKey: 'hello'
          }
        }
      };
      mutatedObj = traverseAndDelete(obj, 'deeplyNestedPath.nestedPath');
      assert.deepEqual(mutatedObj, {
        deeplyNestedPath: {}
      });

      obj = {
        deeplyNestedPath: {
          nestedPath: {
            awesomeKey: 'hello'
          }
        }
      };
      mutatedObj = traverseAndDelete(obj, 'deeplyNestedPath');
      assert.deepEqual(mutatedObj, {});
    });

    it('should iterate if key is an array and traverse over path', () => {
      let obj = {
        myArr: [
          {
            myKey: 'hello',
            safeKey: 'hooyah one'
          }, {
            myKey: 'hello',
            safeKey: 'hooyah two'
          }
        ]
      };
      let mutatedObj = traverseAndDelete(obj, 'myArr.myKey');
      assert.deepEqual(mutatedObj, {
        myArr: [
          {
            safeKey: 'hooyah one'
          }, {
            safeKey: 'hooyah two'
          }
        ]
      });

      obj = {
        myArr: [
          {
            nestedArr: [
              {
                nestedKey: 'yolo one'
              }
            ],
            safeKey: 'hooyah one'
          },
          {
            nestedArr: [
              {
                nestedKey: 'yolo two'
              }
            ],
            safeKey: 'hooyah two'
          }
        ]
      };
      mutatedObj = traverseAndDelete(obj, 'myArr.nestedArr.nestedKey');
      assert.deepEqual(mutatedObj, {
        myArr: [
          {
            nestedArr: [{}],
            safeKey: 'hooyah one'
          }, {
            nestedArr: [{}],
            safeKey: 'hooyah two'
          }
        ]
      });
    });
  });
});
