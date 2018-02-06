/* eslint-disable no-param-reassign */
import t from 'typy';
import { traverseAndDelete } from './util';

const deleteKey = (obj, keyPath) => {
  if (t(obj).isDefined && t(keyPath).isString) {
    obj = traverseAndDelete(obj, keyPath);
  }
  return obj;
};

export default deleteKey;
