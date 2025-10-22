// https://www.geeksforgeeks.org/problems/longest-common-substring1452/1

/*

Similar to subsequence, there if the char is not matching, we will try to decrement i or j, but here we need to set it as 0


*/

/*

Recursion

O(2^(n + m)) & O(n + m)

*/


class Solution {
    longestCommonSubstr(s1, s2) {
        // code here
        const n1 = s1.length, n2 = s2.length
        
        const findCount = (i1, i2, count) => {
            if (i1 === 0 || i2 === 0) return count
            
            if (s1[i1] === s2[i2]) {
                count =  findCount(i1 - 1, i2 - 1, count + 1) // increase the count
            }
            
            
            return Math.max(count, findCount(i1, i2 - 1, 0), findCount(i1 - 1, i2, 0)) // no match, reset the count to 0
        }
        
        return findCount(n1, n2, 0)
        
        
    }
}


/*

Tabulation

O(n*m) & O(n*m)

*/

class Solution {
    longestCommonSubstr(s1, s2) {
        // code here
        const n1 = s1.length, n2 = s2.length
        let dp = Array.from({length: n1 + 1}, () => new Array(n2 + 1).fill(0))
        let max = 0
        for (let i = 1; i <= n1; i++) {
            for (let j = 1; j <= n2; j++) {
                if (s1[i - 1] === s2[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1]
                } // else case not needed to set as 0, since we initialize the array with 0
                
                max = Math.max(dp[i][j], max)
            }
        }
        
        return max
        
    }
}


/*

Space ops

O(n*m) & O(m)

*/


class Solution {
    longestCommonSubstr(s1, s2) {
        // code here
        const n1 = s1.length, n2 = s2.length
        let prev = new Array(n2 + 1).fill(0), 
        curr = new Array(n2 + 1).fill(0)
        let max = 0
        for (let i = 1; i <= n1; i++) {
            curr = new Array(n2 + 1).fill(0)
            for (let j = 1; j <= n2; j++) {
                if (s1[i - 1] === s2[j - 1]) {
                    curr[j] = 1 + prev[j - 1]
                }
                
                max = Math.max(curr[j], max)
            }
            prev = curr
        }
        
        return max
        
        
    }
}