import { assert } from 'chai';
import deleteKey from '../src/delete-key';

describe('Delete Key', () => {
  it('should delete key from keyPath', () => {
    const deepObj = {
      myArr: [
        {
          nestedArr: [
            {
              nestedKey: 'yolo one',
              nestedSafeKey: 'safety safe'
            }
          ],
          safeKey: 'hooyah one'
        },
        {
          nestedArr: [
            {
              nestedKey: 'yolo two',
              nestedSafeKey: 'safety safe'
            }
          ],
          safeKey: 'hooyah two'
        }
      ]
    };

    const mutatedObj = deleteKey(deepObj, 'myArr.nestedArr.nestedKey');
    assert.deepEqual(mutatedObj, {
      myArr: [
        {
          nestedArr: [
            {
              nestedSafeKey: 'safety safe'
            }
          ],
          safeKey: 'hooyah one'
        }, {
          nestedArr: [
            {
              nestedSafeKey: 'safety safe'
            }
          ],
          safeKey: 'hooyah two'
        }
      ]
    });
  });

  it('should return the input when invalid input is passed', () => {
    const obj = {};
    const mutatedObj = deleteKey(obj, 'myArr.nestedArr.nestedKey');
    assert.deepEqual(mutatedObj, obj);
  });

  it('should return the same object when invalid key path is passed', () => {
    let obj = {
      nestedKey: 'hello'
    };
    assert.deepEqual(deleteKey(obj, 'wrongKey'), obj);

    obj = {
      nestedKey: 'hello'
    };
    assert.deepEqual(deleteKey(obj, 'wrongKey.superWrongKey'), obj);
  });
});
