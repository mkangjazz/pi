export default function sortArrayObjectsByAmount(arr) {
  return arr.sort(function(a, b) {
    return Number(b.amount) - Number(a.amount);
  });
};

