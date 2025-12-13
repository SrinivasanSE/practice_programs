// https://www.geeksforgeeks.org/maximum-sum-subarray-sum-less-equal-given-sum/

/*

Brute

O(n^2) & O(1)

*/

function findMaxSubarraySum(arr, sum) {
  let result = 0;
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    let currSum = 0;
    for (let j = i; j < n; j++) {
      currSum += arr[j];
      if (currSum < sum) {
        result = Math.max(result, currSum);
      }
    }
  }
  return result;
}

/*

Optimal

O(n) & O(1)

*/

class Solution {
  findMaxSubarraySum(arr, x) {
    // code here
    let res = 0;
    let currSum = 0;
    let start = 0;
    const n = arr.length;
    for (let end = 0; end < n; end++) {
      currSum += arr[end];

      while (currSum > x) {
        currSum -= arr[start];
        start += 1;
      }

      res = Math.max(res, currSum);
    }

    return res;
  }
}
