// https://leetcode.com/problems/largest-rectangle-in-histogram/description/


/*

Brute
O(5n) & O(4n)

*/



const findPSE = (arr, n) => {
    let res = [], stk = []

    for(let i = 0; i < n; i++) {
        while (stk.length > 0 && arr[stk[stk.length - 1]] >= arr[i]) {
            stk.pop()
        }

        res[i] = stk.length ? stk[stk.length - 1] : -1
        stk.push(i)
    }

    return res
}

const findNSE = (arr, n) => {
    let res = [], stk = []

    for(let i = n - 1; i >= 0; i--) {
        while (stk.length > 0 && arr[stk[stk.length - 1]] > arr[i]) {
            stk.pop()
        }

        res[i] = stk.length ? stk[stk.length - 1] : n
        stk.push(i)
    }

    return res
}


var largestRectangleArea = function(heights) {
    const n = heights.length
    const pse = findPSE(heights, n) // 2n
    const nse = findNSE(heights, n) // 2n
    let area = 0
    for(let i = 0; i < n; i++) { // n
        area = Math.max(area, (heights[i]*(nse[i] - pse[i] - 1)))
    }

    return area
};


/*

Optimal
O(2n) & O(n)

*/

var largestRectangleArea = function(heights) {
    const n = heights.length
    let area = 0, stk = [], nse, pse, curr
    for(let i = 0; i < n; i++) {
        while (stk.length > 0 && heights[stk[stk.length - 1]] > heights[i]) {
            curr = stk.pop()
            nse = i, pse = stk.length ? stk[stk.length - 1] : -1
            area = Math.max(area, heights[curr]*(nse - pse - 1))
        }

        stk.push(i)
    }

    while (stk.length) {
        curr = stk.pop()
        pse = stk.length ? stk[stk.length - 1] : -1
        area = Math.max(area, heights[curr]*(n - pse - 1))
    }

    return area
};