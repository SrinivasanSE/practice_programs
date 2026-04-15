# We use pick and not pick approach

## pick || notPick

1) Subset Sum equal to target

- The func takes two params, i and target.
- We start the recursion from n - 1 and target as sum.
- Base condition:
    if t < 0 return false
    if t == 0 return true
    if i == 0 return t == arr[i]
- Use pick and not pick approach. 
    NotPick - dp[i - 1][t] 
    Pick - dp[i - 1][t - arr[i]]
- For tabulation, we run the for loop from i = 1 to n and target from 0 to sum.
- For space ops using 1DP, we can just run the target from sum to arr[i] in reverse to use only single arr.
- If dp[sum] becomes true at any point, return there itself.

2) Partition equal subset sum

- We need to find the sum of the elements in the arr, if the target is odd, it's not possible to partition, so return false.
- We can use the same above logic as in #1 and the target will be sum / 2

3) Minimum Sum Partition

- We need to find the sum of the elements which will be the target.
- We need to find the minPossibleClosest sum. We use the same logic as #1 and run a for loop from target/2 to 0, if the dp[i] is true, that means
    this sum is possible.
- We need to return s2 - s1, where s1 = min, s2 = total - min, which is total - 2 * min.

## pick + notPick

4) Count Subsets with Sum K

- The func takes two params, i and target.
- We start the recursion from n - 1 and target as sum.
- Base Condition
    if (i == 0) 
        if (t == 0 && arr[i] == 0) return 2
        if (t == 0 || arr[i] == t) return 1
        return 0
- Use pick and not pick approach. 
    NotPick - dp[i - 1][t] 
    Pick - dp[i - 1][t - arr[i]]
- For tabulation, we run the for loop from i = 1 to n and target from 0 to sum.
- For space ops using 1DP, we can just run the target from sum to arr[i] in reverse to use only single arr.


5) Count Partitions with Given Difference / Target Sum

- The target will be (totalSum - d) / 2.
- totalSum - d < 0 and totalSum - d should be even
- Use the same #4 logic

## Math.max(pick, notPick)

6) 0 - 1 Knapsack

- Similar to count approach, the target is weight here
- We start the recursion from n - 1 and target as W
- Base Condition
    if (i == 0)
        if (w >= wt[i]) return val[i]
        return 0
- Use pick and not pick approach. 
    NotPick - dp[i - 1][w] 
    Pick - val[i] + dp[i - 1][w - wt[i]]
- For tabulation, we run the for loop from i = 1 to n and target from 0 to W.
- For space ops using 1DP, we can just run the target from W to wt[i] in reverse to use only single arr.

7) Unbounded Knapsack 

- Similar to count approach, the target is weight here
- We start the recursion from n - 1 and target as W
- Base Condition
    if (i == 0)
        return Math.floor(w/wt[0]) * val[0]
- Use pick and not pick approach. 
    NotPick - dp[i - 1][w] 
    Pick - val[i] + dp[i][w - wt[i]] // we stay at the same index
- For tabulation, we run the for loop from i = 1 to n and target from 0 to W.
- For space ops using 1DP, we can just run the target from wt[i] to W to use only single arr.

8) Rod Cutting

- We consider the length of the rod as given arr length
- We start the recursion from n - 1 and target as n
- Base Condition
    if (len == 0) return 0
    if (i == 0) return len * price[0]
- Use pick and not pick approach. 
    NotPick - dp[i - 1][len] 
    Pick - price[i] + dp[i][rodLength - len] // we stay at the same index and take the rodLength as i + 1
- For tabulation, we run the for loop from i = 1 to n and target from 0 to n.
- For space ops using 1DP, we can just run the target from i + 1 to n to use only single arr.


## Math.min(pick, notPick)

8) Coin Change (No of coins)

- The func takes two params, i and bal.
- We start the recursion from n - 1 and amount.
- Base Condition
    if (i == 0) 
        if (bal % coins[0]) return bal / coins[0]
        return 1e9
- Use pick and not pick approach, 
    NotPick - dp[i - 1][bal] 
    Pick - 1 + dp[i][bal - coins[i]] // we stay at the same index and add 1
- For tabulation, we run the for loop from i = 1 to n and bal from 0 to amount
- For space ops using 1DP, we can just run the target from coins[i] to amount to use only single arr. // we don't run from amount to coins[i] since it's same arr dp[i] and not dp[i - 1]
- Return -1 if the dp[amount] is 1e9 else the dp[amount]

9) Coin Change (No of ways)

- Similar to above function, instead of no coins, we need to count no of ways, so we do pick + notPick
- The func takes two params, i and bal.
- We start the recursion from n - 1 and amount.
- Base Condition
    if (bal == 0) return 1
    if (i == 0) 
        if (bal % coins[0]) return 1
        return 0
- Use pick and not pick approach, 
    NotPick - dp[i - 1][bal] 
    Pick - dp[i][bal - coins[i]] // we stay at the same index
- For tabulation, we run the for loop from i = 1 to n and bal from 0 to amount
- For space ops using 1DP, we can just run the target from coins[i] to amount to use only single arr. // we don't run from amount to coins[i] since it's same arr dp[i] and not dp[i - 1]
- Return dp[amount]
