
## 2DP problems

We need to traverse the 2d arr and find the no of ways or min/max sum.

1. Unique Paths

we use m and n index.
Start from m - 1, n - 1 in recursion and i = 0 and j = 0 in tabulation.
if (i == 0 && j == 0) we return 1, if the index goes negative, we return 0
Have two options, go left or top
Add left + top
1DP possible with only arr.

2. Unique Paths with Obstacles

Same as above, just when the grid[i][j] == 1, we need to assign dp[j] = 0

3. Minimum Path Sum

we use m and n index.
Start from m - 1, n - 1 in recursion and i = 0 and j = 0 in tabulation.
Have two options, go left or top. We need to add grid[i][j]. Init with 1e9 and if the index is valid, go left/top.
Take min of left, top
1DP possible with only arr.

4. Triangle

we use i and j index.
Since we have a definite start from the first row, we start recursion from 0, 0 and i = n - 2 and j = 0 in tabulation.
Have two options, go bottom or bottomRight. We need to add triangle[i][j].
Take min of both
1DP possible with only arr.

5. Minimum Falling Path Sum

we use i and j index.
We start from the first row, we start recursion from 0, 0 and i = n - 2 and j = 0 in tabulation.
Have 3 options, go bottom or bottomRight or bottomLeft. We need to add square[i][j].
Take min of all 3.
The result will be min of the first row in dp since we have multiple starting points.
1DP of two arr required and not possible with only 1 arr.


## 3dp problems

6) Cherry Pickup II

We use i, j1, j2 index.
We start from the first row, recursion from 0, 0, n - 1 and i = n - 2, j1 = n - 1 and j2 = 0 in tabulation
We need to use two for loops which goes from -1 to 1 and find the max of all of them
2dp ops is possible using two arrs.