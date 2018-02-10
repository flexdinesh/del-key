/* eslint-disable no-param-reassign */
import t from 'typy';

export const stripFirstKeyFromPath = path => t(path).safeString.split('.').shift();

export const stripTrailingKeysFromPath = path => t(path).safeString.slice(t(path).safeString.split('.').shift().length + 1);

export const stripKeyFromArrayPath = path => t(path).safeString.split('[').shift();

export const stripArrayIndexFromArrayPath = (path) => {
  const matches = /\[([^)]+)\]/.exec(t(path).safeString);
  if (t(matches).isArray && matches.length >= 1) return Number(matches[1]);
  return path;
};

export const deleteKey = (obj, key) => {
  if (key.includes('[')) {
    const objKey = stripKeyFromArrayPath(key);
    const arrIndex = stripArrayIndexFromArrayPath(key);
    if (
      t(obj[objKey]).isArray &&
      obj[objKey].length >= (arrIndex + 1)
    ) {
      obj[objKey].splice(arrIndex, 1);
    }
  } else if (t(obj[key]).isDefined) {
    delete obj[key];
  }
  return obj;
};

export const traverseAndDelete = (obj, keyPath) => {
  const key = stripFirstKeyFromPath(keyPath);
  const trailingKeys = stripTrailingKeysFromPath(keyPath);

  if (t(trailingKeys).isEmptyString) {
    deleteKey(obj, key);
  } else if (t(obj[key]).isDefined) {
    if (t(obj[key]).isArray) {
      obj[key].forEach((item) => {
        traverseAndDelete(item, trailingKeys); // TODO
      });
    } else {
      traverseAndDelete(obj[key], trailingKeys);
    }
  } else if (key.includes('[')) {
    if (
      t(obj[stripKeyFromArrayPath(key)]).isArray &&
      obj[stripKeyFromArrayPath(key)].length >= (stripArrayIndexFromArrayPath(key) - 1)
    ) {
      traverseAndDelete(
        obj[stripKeyFromArrayPath(key)][stripArrayIndexFromArrayPath(key)],
        trailingKeys
      );
    }
  }
  return obj;
};
