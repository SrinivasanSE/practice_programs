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
        while (stk.length > 0 && arr[stk[stk.length - 1]] >= arr[i]) {
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


var largestRectangleArea = function(heights) { // find the pse and nse on the fly
    const n = heights.length
    let area = 0, stk = [], nse, pse, curr
    for(let i = 0; i < n; i++) {
        while (stk.length > 0 && heights[stk[stk.length - 1]] > heights[i]) { // when we find that the current height is lesser than the stack's top element's height, 
        // the current element becomes the next smallest element for the stack's top element and the element after that top element becomes the previous smallest element
            curr = stk.pop()
            nse = i, pse = stk.length ? stk[stk.length - 1] : -1 // nse becomes the current element and pse is the stack top's after popping the top
            area = Math.max(area, heights[curr]*(nse - pse - 1))
        }

        stk.push(i)
    }

    while (stk.length) { // if the stack still has elements, that means those elements doesn't have next smaller elements, so take nse as n, if pse is not there, we consider it as -1
        curr = stk.pop()
        pse = stk.length ? stk[stk.length - 1] : -1
        area = Math.max(area, heights[curr]*(n - pse - 1))
    }

    return area
};

// Similar to 907 problem

var largestRectangleArea = function(heights) {
    const stk = []
    const n = heights.length

    let maxArea = 0, pse, nse, curr

    for (let i = 0; i <= n; i++) {
        while (stk.length > 0 && (i === n || heights[stk[stk.length - 1]] > heights[i] )) {
            curr = stk.pop()
            nse = i
            pse = stk.length === 0 ? -1 : stk[stk.length - 1]

            maxArea = Math.max(maxArea, (nse - pse - 1) * heights[curr])
        }

        stk.push(i)
    }

    return maxArea
};