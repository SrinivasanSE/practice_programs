// https://leetcode.com/problems/assign-cookies/description/
// 2410. Maximum Matching of Players With Trainers

/*

Greedy - Sorting + Two pointers
O(nlogn) + O(mlogm) & O(1)

*/


var findContentChildren = function(g, s) {
    const m = s.length
    let l = 0, r = 0

    g.sort((a, b) => a - b)
    s.sort((a, b) => a - b)
    while (r < m) {
        if (g[l] <= s[r]) { // if we can assign the cookie, move to the next child
            l++
        }
        r++ // keep moving the cookies
    }

    return l // l will point to the no of childs

};



// DP Approaches, not efficient, just for reference

// O(n log n + m log m + n * m) & O(n*m)

var findContentChildren = function(g, s) {
    const n = g.length
    const m = s.length

    g.sort((a, b) => a - b)
    s.sort((a, b) => a - b)

    const dp = Array.from({length: n + 1}, () => new Array(m + 1).fill(0))

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (s[j - 1] >= g[i - 1]) {
                dp[i][j] = Math.max(dp[i - 1][j - 1] + 1, dp[i - 1][j]) // pick and not pick, i represents the children and j represents the cookies
            } else {
                dp[i][j] = dp[i - 1][j]
            }
        }
    }

    return dp[n][m]
    
};


// O(n log n + m log m + n * m) & O(m)


var findContentChildren = function(g, s) {
    const n = g.length
    const m = s.length

    g.sort((a, b) => a - b)
    s.sort((a, b) => a - b)

    let prev = new Array(m + 1).fill(0)
    for (let i = 1; i <= n; i++) {
        curr = new Array(m + 1).fill(0)
        for (let j = 1; j <= m; j++) {
            if (s[j - 1] >= g[i - 1]) {
                curr[j] = Math.max(prev[j - 1] + 1, prev[j])
            } else {
                curr[j] = prev[j]
            }
        }

        prev = curr
    }

    return prev[m]
    
};