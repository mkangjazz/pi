import prefixEachArrayObject from './prefixEachArrayObject';
import sortArrayObjectsByAmount from './sortArrayObjectsByAmount';

export default function prepArray(arr) {
  return prefixEachArrayObject(sortArrayObjectsByAmount(arr));
};
