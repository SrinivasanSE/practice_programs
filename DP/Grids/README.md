


1) Unique Paths

we use m and n index.
Start from m - 1, n - 1.
if (i == 0 && j == 0) we return 1, if the index goes negative, we return 0
Have two options, go left or top
Add left + top
1DP possible with only arr.

2) Unique Paths with Obstacles

Same as above, just when the grid[i][j] == 1, we need to assign dp[j] = 0

3) Minimum Path Sum

we use m and n index.
Start from m - 1, n - 1.
Have two options, go left or top. We need to add grid[i][j].
Take min of left, top
1DP possible with only arr.