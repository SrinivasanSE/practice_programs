
# String 2DP


## match, not match

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
- For tabulation, we run the for loop from 1 to n for both i and j
-  1DP is possible, we use the prev variable to track the value in the previous row

2) Print LCS

- We use the 2dp logic from #1 and form the string by traversing the dp table
- Set i = n1 and j = n2 and run the while loop till they > 0
- If the text1[i - 1] == text2[j - 1], we add the curr char to the res and do i--, j--
- Else we need to find from where the curr value came by finding which is max, dp[i - 1][j] or dp[i][j - 1] and move i or j based on that
- Return the res.join(",") at the end

3) Longest Common Substring

- Similar to #1, if it's not a match, we can't move one index and keep other same as it should be substring and not sequence.
- So there is no non match condition, we can just set it as 0 in the else condition, dp[i][j] = 0
- We need to track the max value in the dp in each inside loop iteration, we can't return dp[n][n] at the end to get the value.
- Return the max

## Palindrome

4) Longest Palindromic Subsequence

- We can solve using this logic LPS = LCS(s, reverse(s)), but there is another approach without reversing the string
- We can traverse the same string and compare from the start and end of the string.
- Start the recursion from 0 and n - 1
- Base condition
    if (i > j) return 0
    if (i == j) return 1
- if s1[i - 1] == s2[j - 1], it's a match and we can move both the index 
    match - 2 + find(i - 1, j - 1) // we add 2 here since it's 2 matching chars for palindrome
  else we take the max of both of the possibilities, we move one index and keep the other index same to try to match the char
    Not match - Math.max(find(i, j - 1), find(i - 1, j)) 
- For tabulation, we run the for loop from n - 1 to 0 for i and i + 1 to n for j
-  1DP is possible, we use the prev variable to track the value in the previous row and also we need to assign dp[i] = 1

5) Minimum Insertion Steps to Make a String Palindrome

- If we already know the Longest Palindromic Subsequence inside s,
    then we know which characters are already fine — the ones we don’t need to insert anything for.
    The remaining characters (those not part of the palindrome) are the ones we need to fix by inserting.
    To find this, we can just subtract the longest palindrome subsequence from the string length
- Return n - dp[n - 1]

