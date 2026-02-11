// https://www.geeksforgeeks.org/smallest-greater-elements-in-whole-array/

// O(nlogn) & O(1)


class Solution {
  // Function to find the next greater element for each element of the array.
  greaterElement(arr, n) {
    // your code here
    const res = [];
    const sortedArr = Array.from(new Set(arr)).sort((a, b) => a - b);
    const len = sortedArr.length;
    for (let num of arr) {
      const idx = upperBound(sortedArr, num);
      if (idx >= len) res.push(-10000000);
      else res.push(sortedArr[idx]);
    }

    return res;
  }
}
