
# Stock related problems

## using canBuy


### 122

- The Recursion func takes 2 params,i and canBuy. We start the recursion from 0 for i and 1 for canBuy.
- Base condition:
    if (i == n) return 0
- if canBuy, we have two options,
        buy = -prices[i] + find(i + 1, 0)
        notBuy = find(i + 1, 1)
        return Math.max(buy, notBuy)
   else
        sell = prices[i] + find(i + 1, 1)
        notSell = find(i + 1, 0)
        return Math.max(sell, notSell)
- For tabulation, run the for loop from n - 1 to 0 for i and 0 to 1 for canBuy
- 1DP and O(1) space sol is possible using cash, hold, prevCash variables

### 714 (with fee)

- Same as #122
- We need to add the fee while selling, sell = prices[i] - fee + find(i + 1, 1)
- For tabulation, run the for loop from n - 1 to 0 for i and 0 to 1 for canBuy
- 1DP and O(1) space sol is possible using cash, hold, prevCash variables

### 309 (with cooldown)

- The Recursion func takes 2 params,i and canBuy. We start the recursion from 0 for i and 1 for canBuy.
- Base condition:
    if (i >= n) return 0
- if canBuy, we have two options,
        buy = -prices[i] + find(i + 1, 0)
        notBuy = find(i + 1, 1)
        return Math.max(buy, notBuy)
   else
        sell = prices[i] + find(i + 2, 1) // this is the only change
        notSell = find(i + 1, 0)
        return Math.max(sell, notSell)
- For tabulation, run the for loop from n - 1 to 0 for i and 0 to 1 for canBuy
- 1DP is possible using front, curr, front2 and O(1) space sol is possible using sold, prevSold, hold, rest variables



## using tCount

### 123, 188

- The Recursion func takes 2 params,i and tCount. We start the recursion from 0 for i and 0 for tCount.
- Base condition:
    if (i == n || tCount == 2 *k) return 0
- if tCount % 2 == 0, we have two options,
        buy = -prices[i] + find(i + 1, tCount + 1)
        notBuy = find(i + 1, tCount)
        return Math.max(buy, notBuy)
   else
        sell = prices[i] + find(i + 1, tCount)
        notSell = find(i + 1, tCount)
        return Math.max(sell, notSell)
- For tabulation, run the for loop from n - 1 to 0 for i and 0 to 2*k for tCount
- 1DP and O(1) space sol is possible for #123 using 4 variables buy1, sell1, buy2, sell2




