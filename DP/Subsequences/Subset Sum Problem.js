// https://www.geeksforgeeks.org/problems/subset-sum-problem-1611555638/1

/*

Recursion

O(2^n) & O(n)

*/
class Solution {
  isSubsetSum(arr, sum) {
    // code here
    const n = arr.length;

    const isSubset = (i, target) => {
      if (target == 0) return true;
      if (i == 0) return target == arr[i];

      const notTake = isSubset(i - 1, target); // consider not taking the curr arr element and keeping the target same
      let take = false;
      if (target >= arr[i]) {
        // if the remaining target is greater than the curr element, consider picking that curr num and we reduce the target
        take = isSubset(i - 1, target - arr[i]);
      }

      return notTake || take; // Check if any of the two returns true
    };

    return isSubset(n - 1, sum);
  }
}

/*

Memo

O(n*k) & O(n) + O(n*k)

*/

class Solution {
  isSubsetSum(arr, sum) {
    // code here
    const n = arr.length;
    const dp = Array.from({ length: n }, () => new Array(sum + 1).fill(-1));
    const isSubset = (ind, target) => {
      if (target === 0) {
        return true;
      }
      if (ind === 0) {
        return arr[ind] === target;
      }

      if (dp[ind][target] != -1) return dp[ind][target];

      const notPick = isSubset(ind - 1, target);

      if (notPick) return (dp[ind][target] = true);

      let pick = false;

      if (target >= arr[ind]) {
        pick = isSubset(ind - 1, target - arr[ind]);
      }

      return (dp[ind][target] = pick);
    };

    return isSubset(n - 1, sum);
  }
}

/*

Tabulation

O(n*k) & O(n*k)

*/

class Solution {
  isSubsetSum(arr, sum) {
    // code here
    const n = arr.length;
    const dp = Array.from({ length: n }, () => new Array(sum + 1).fill(false)); // create an array with n & sum size

    for (let i = 0; i < n; i++) {
      // base case - for target 0, the dp will be true
      dp[i][0] = true;
    }

    if (arr[0] <= sum) dp[0][arr[0]] = true; // at index 0, arr[0] will be true

    for (let i = 1; i < n; i++) {
      // run from i = 1 and check for each target,
      for (let target = 0; target <= sum; target++) {
        dp[i][target] =
          dp[i - 1][target] ||
          (target >= arr[i] ? dp[i - 1][target - arr[i]] : false); // not pick || pick
      }
    }

    return dp[n - 1][sum];
  }
}

/*

Space ops

O(n*k) & O(k)

*/

class Solution {
  isSubsetSum(arr, sum) {
    // code here
    const n = arr.length;
    let dp = new Array(sum + 1).fill(false);

    dp[0] = true;
    dp[arr[0]] = true;

    for (let i = 1; i < n; i++) {
      for (let target = sum; target >= arr[i]; target--) { // we can only run till arr[i] and run in reverse to use single dp arr and no need of curr and prev arr
        dp[target] = dp[target] || dp[target - arr[i]];
        if (dp[sum]) return true;
      }
    }

    return dp[sum];
  }
}
