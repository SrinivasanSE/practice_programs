// https://www.geeksforgeeks.org/problems/minimum-sum-partition3317/1

// Check the leetcode variant where the negative numbers are there and the partition should be split equally with n length

/*

Space ops

O(n*k) & O(k)

*/

/*

The last row in the dp table has data of which targets are possible if we consider 0 to i elements, dp[n - 1][target]

Our DP (prev[]) tells us which subset sums are possible using elements of the array.

prev[i] === true → it’s possible to form a subset with sum i

so we try to find the sum of a subset which will give the min abs difference, 

We need to find totalSum and totalSum - s1 will give the another subset's sum, We need to find the min abs difference between s1 and s2.

*/

class Solution { // No need to split the partition equally with same length and also only positive nums will be there
  minDifference(arr) { // uses subset sum code
    // your code here
    const n = arr.length;
    const totalSum = arr.reduce((acum, curr) => acum + curr, 0);
    const prev = new Array(totalSum + 1).fill(false);
    prev[0] = true;
    if (arr[0] <= totalSum) prev[arr[0]] = true;

    for (let i = 1; i < n; i++) {
      for (let target = totalSum; target >= 0; target--) {
        prev[target] =
          prev[target] || (target >= arr[i] ? prev[target - arr[i]] : false);
      }
    }

    let minPossibleClosestSum = Number.MAX_SAFE_INTEGER;
    for (let i = Math.floor(totalSum / 2); i >= 0; i--) {
      // We need to only run till sum/2 because after that just s1 will become s2 and abs diff will be same.
      // We want S1 as close as possible to totalSum / 2 to minimize the diff, so start from reverse
      if (prev[i]) {
        minPossibleClosestSum = i;
        break;
      }
    }

    return totalSum - 2 * minPossibleClosestSum; // s1 = min, s2 = totalSum - min, (s1 - s2) -> totalSum - 2*min
  }
}
