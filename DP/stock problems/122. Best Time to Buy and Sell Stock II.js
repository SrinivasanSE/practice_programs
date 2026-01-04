// https://www.geeksforgeeks.org/dsa/stock-buy-sell/
// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/description/

// Greedy approach

class Solution {
  // Function to find the days of buying and selling stock for max profit.
  stockBuySell(arr) {
    // your code here
    let total = 0;

    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] < arr[i + 1]) {
        // we keep selling while the prices are going up
        total += arr[i + 1] - arr[i];
      }
    }

    return total;
  }
}

class Solution {
  // Function to find the days of buying and selling stock for max profit.
  stockBuySell(arr) {
    // your code here
    let total = 0;

    const n = arr.length;
    let lmin = arr[0];
    let lmax = arr[0];
    for (let i = 0; i < n - 1; i++) {
      while (i < n - 1 && arr[i] >= arr[i + 1]) i++; // Skip days while the price is going down & The day right after the last drop is a local minimum (buy here)
      lmin = arr[i];
      while (i < n - 1 && arr[i] <= arr[i + 1]) i++; // Keep going while price is going up &  The day just before it starts falling is a local maximum
      lmax = arr[i];

      total += lmax - lmin;
    }
    return total;
  }
}

// DP approach

/*

Recursion

O(2^n) & O(n)

*/

var maxProfit = function (prices) {
  const n = prices.length;

  const findProfit = (i, canBuy) => {
    if (i === n) {
      return 0;
    }

    if (canBuy) {
      const buy = -prices[i] + findProfit(i + 1, 0); // add the price in negative to mark it as buy, when we sell, we will get the net gain, go to next index and cannot buy anymore
      const notBuy = findProfit(i + 1, 1); // move to next index by deciding not to buy

      return Math.max(buy, notBuy);
    }

    const sell = prices[i] + findProfit(i + 1, 1); // deciding to sell, add the price and move to next index with buy option since we don't hold the stock anymore
    const notSell = findProfit(i + 1, 0); // deciding not to sell, move to the next index and see if we sell at another price
    return Math.max(sell, notSell);
  };

  return findProfit(0, 1); // start the recursion from 0
};

/*

Memo

O(n*2) & O(n) + O(n*2)

*/

var maxProfit = function (prices) {
  const n = prices.length;

  const dp = Array.from({ length: n }, () => new Array(2).fill(-1));

  const findProfit = (i, canBuy) => {
    if (i === n) {
      return 0;
    }

    if (dp[i][canBuy] != -1) return dp[i][canBuy];

    if (canBuy) {
      const buy = -prices[i] + findProfit(i + 1, 0);
      const notBuy = findProfit(i + 1, 1);

      return (dp[i][canBuy] = Math.max(buy, notBuy));
    }

    const sell = prices[i] + findProfit(i + 1, 1);
    const notSell = findProfit(i + 1, 0);
    return (dp[i][canBuy] = Math.max(sell, notSell));
  };

  return findProfit(0, 1);
};

/*

Tabulation

O(n*2) & O(n*2)

*/

var maxProfit = function (prices) {
  const n = prices.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(2).fill(0));

  /*
    dp[i][1] = maximum profit we can achieve starting from day i, if we are allowed to buy.
    dp[i][0] = maximum profit we can achieve starting from day i, if we are currently holding a stock.
    */

  dp[n][0] = dp[n][1] = 0; // base case, there are no transactions left, so profit = 0 regardless of whether we can buy or sell.

  for (let i = n - 1; i >= 0; i--) {
    // We iterate backwards from the last day to day 0:
    for (let canBuy = 0; canBuy <= 1; canBuy++)
      if (canBuy) {
        const buy = -prices[i] + dp[i + 1][0]; // if we are buying today, then we are getting the best possible result of selling tomorrow by using dp[i + 1][0]
        const notBuy = dp[i + 1][1]; // I am not buying today, I will get the best result of buying tomorrow

        dp[i][canBuy] = Math.max(buy, notBuy);
      } else {
        const sell = prices[i] + dp[i + 1][1]; // You sell the stock you already had (which was bought on some earlier day). You get profit prices[i] + whatever future profit is possible from the next state
        const notSell = dp[i + 1][0]; // You skip selling today, remain holding the stock, so profit is whatever best you can get by still holding tomorrow
        dp[i][canBuy] = Math.max(sell, notSell);
      }
  }

  return dp[0][1]; // maximum profit starting at day 0, allowed to buy
};

/*

Space ops - 1

O(n*2) & O(2) + O(2)

*/

var maxProfit = function (prices) {
  const n = prices.length;

  let prev = new Array(2).fill(0);
  const curr = new Array(2).fill(0);

  for (let i = n - 1; i >= 0; i--) {
    for (let canBuy = 0; canBuy <= 1; canBuy++) {
      if (canBuy) {
        const buy = -prices[i] + prev[0];
        const notBuy = prev[1];

        curr[canBuy] = Math.max(buy, notBuy);
      } else {
        const sell = prices[i] + prev[1];
        const notSell = prev[0];
        curr[canBuy] = Math.max(sell, notSell);
      }
    }
    prev = [...curr];
  }

  return prev[1];
};

/*

Space ops - 2

O(n) & O(2)

*/

var maxProfit = function (prices) {
  const n = prices.length;

  let front = new Array(2).fill(0),
    curr = new Array(2).fill(0);

  for (let i = n - 1; i >= 0; i--) {
    // no need for canBuy for loop, just assign directly

    const buy = -prices[i] + front[0];
    const notBuy = front[1];

    curr[1] = Math.max(buy, notBuy);

    const sell = prices[i] + front[1];
    const notSell = front[0];

    curr[0] = Math.max(sell, notSell);

    front = [...curr];
  }

  return front[1];
};

/*

Space ops - 3

O(n) & O(1)

*/

var maxProfit = function (prices) {
  const n = prices.length;

  let aheadNotBuy = 0,
    aheadBuy = 0,
    currBuy,
    currNotBuy;

  for (let i = n - 1; i >= 0; i--) {
    currBuy = Math.max(-prices[i] + aheadNotBuy, aheadBuy);
    currNotBuy = Math.max(prices[i] + aheadBuy, aheadNotBuy);

    aheadBuy = currBuy;
    aheadNotBuy = currNotBuy;
  }

  return aheadBuy;
};

/*

Space ops - 4

O(n) & O(1)

*/

// Refer 714 problem file for detailed exp

var maxProfit = function (prices) {
  const n = prices.length;

  let hold = -prices[0],
    cash = 0,
    prevCash;
  for (let i = 0; i < n; i++) {
    prevCash = cash;
    cash = Math.max(cash, hold + prices[i]);
    hold = Math.max(hold, prevCash - prices[i]);
  }

  return cash;
};
