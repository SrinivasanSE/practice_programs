
# String 2DP


# match, not match

1) Longest Common Subsequence

- We need to compare the two given strings and find the longest common sequence length
- We start the recursion from n1 and n2 and not n1 - 1, n2 - 1, because of base condition. 
- Base condition
    if (i < 0 || j < 0) return 0 // 0 based indexing, we can use this in recursion, but not in dp, so we go with 1 based indexing
        (or)
    if (i == 0 || j == 0) return 0 // 1 based indexing
- if s1[i - 1] == s2[j - 1], it's a match and we can move both the index 
    match - 1 + find(i - 1, j - 1)
  else we take the max of both of the possibilities, we move one index and keep the other index same to try to match the char
    Not match - Math.max(find(i, j - 1), find(i - 1, j)) 
- For tabulation, we rut the for loop from 1 to n for both i and j
-  1DP is possible, we use the prev variable to track the value in the previous row

2) Print LCS

    - We use the 2dp logic from #1 and form the string by traversing the dp table
    - Set i = n1 and j = n2 and run the while loop till they > 0
    - If the text1[i - 1] == text2[j - 1], we add the curr char to the res and do i--, j--
    - Else we need to find from where the curr value came by finding which is max, dp[i - 1][j] or dp[i][j - 1] and move i or j based on that
    - Return the res.join(",") at the end