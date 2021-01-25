let iter = 0;

export default function prefixEachArrayObject(arr) {
  const pre = 'uID';

  return arr.map((obj, index) => {
    const o = obj;

    o.idx = `${pre}-${iter}`;

    iter++; 

    return o;
  });
}
