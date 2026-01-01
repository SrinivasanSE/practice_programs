// https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1

/*
We can't take any fractional weight here, either take it or not take it, also we don't have to fill the entire capacity and fill as much as possible and get the max profit

*/

/*

Recursion

O(2^n) & O(n)

*/

class Solution {
  knapsack(W, val, wt) {
    // code here
    const n = val.length;

    const findProfit = (ind, capacity) => {
      if (ind === 0) {
        if (wt[ind] <= capacity) return val[ind]; // fill only if the available weight is less or equal to the required capacity
        return 0;
      }

      const notPick = findProfit(ind - 1, capacity);
      let pick = Number.MIN_SAFE_INTEGER;
      if (wt[ind] <= capacity) {
        pick = val[ind] + findProfit(ind - 1, capacity - wt[ind]);
      }
      return Math.max(notPick, pick);
    };

    return findProfit(n - 1, W);
  }
}

/*

Memo

O(n*weight) & O(n) + O(n*weight)

*/

class Solution {
  knapsack(W, val, wt) {
    // code here
    const n = val.length;
    const dp = Array.from({ length: n }, () => new Array(W + 1).fill(-1));
    const findProfit = (ind, capacity) => {
      if (ind === 0) {
        if (wt[ind] <= capacity) return val[ind];
        return 0;
      }
      if (dp[ind][capacity] != -1) return dp[ind][capacity];
      const notPick = findProfit(ind - 1, capacity);
      let pick = Number.MIN_SAFE_INTEGER;
      if (wt[ind] <= capacity) {
        pick = val[ind] + findProfit(ind - 1, capacity - wt[ind]);
      }
      return (dp[ind][capacity] = Math.max(notPick, pick));
    };

    return findProfit(n - 1, W);
  }
}

/*

Tabulation

O(n*weight) &  O(n*weight)

*/

class Solution {
  knapsack(W, val, wt) {
    // code here
    const n = val.length;
    const dp = Array.from({ length: n }, () => new Array(W + 1).fill(0));

    for (let i = wt[0]; i <= W; i++) {
      // base case, we don't have to start from 0, we can take this only if i <= wt[0]
      dp[0][i] = val[0];
    }

    for (let i = 1; i < n; i++) {
      for (let capacity = 0; capacity <= W; capacity++) {
        const notPick = dp[i - 1][capacity];
        let pick = Number.MIN_SAFE_INTEGER;
        if (wt[i] <= capacity) {
          pick = val[i] + dp[i - 1][capacity - wt[i]];
        }
        dp[i][capacity] = Math.max(notPick, pick);
      }
    }

    return dp[n - 1][W];
  }
}

/*

Space ops

O(n*weight) & O(weight)

*/

class Solution {
  knapsack(W, val, wt) {
    // code here
    const n = val.length;
    const prev = new Array(W + 1).fill(0);
    for (let i = wt[0]; i <= W; i++) {
      prev[i] = val[0];
    }

    for (let i = 1; i < n; i++) {
      for (let capacity = W; capacity >= wt[i]; capacity--) {
        // run in reverse, so that we don't overwrite the prev array and no need of curr arr
        const notPick = prev[capacity];
        let pick = val[i] + prev[capacity - wt[i]];
        prev[capacity] = Math.max(notPick, pick);
      }
    }

    return prev[W];
  }
}
