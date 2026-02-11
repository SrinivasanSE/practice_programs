// https://www.geeksforgeeks.org/dsa/check-whether-given-array-k-sorted-array-not/

// O(nlogn) & O(n)

class Pair {
  constructor(k, v) {
    this.key = k;
    this.val = v;
  }
}

function isKSortedArray(arr, n, k) {
  // creating an array to store value,
  // index of the original array
  let aux = [];

  for (let i = 0; i < n; i++) {
    aux.push(new Pair(arr[i], i)); //  pushing the elements and index of arr to aux
  }

  // sorting the aux array
  aux.sort((a, b) => a.key - b.key);

  //  for every element, check if the absolute
  // value of (currIndex-originalIndex) <= k
  //  if not, then return "NO"
  for (let i = 0; i < n; i++) {
    if (Math.abs(i - aux[i].val) > k) return "No";
  }

  // If all elements satisfy the condition,
  // the loop will terminate and
  // "Yes" will be returned.
  return "Yes";
}
