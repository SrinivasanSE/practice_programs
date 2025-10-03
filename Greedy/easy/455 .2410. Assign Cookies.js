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