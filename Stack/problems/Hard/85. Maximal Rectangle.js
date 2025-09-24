// https://leetcode.com/problems/maximal-rectangle/description/

/*

Optimal - Used 84 solution here

O(rows*cols) & (O(cols) + O(cols)) - for heights arr and stack inside the largestRectangleAre func

O(rows)
    - O(cols) + O(cols) = O(cols)
= O(rows)*O(cols)
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


var maximalRectangle = function(matrix) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return 0;
    }

    const rows = matrix.length;
    const cols = matrix[0].length;
    const heights = new Array(cols).fill(0);
    let maxArea = 0;

    for (let i = 0; i < rows; i++) { // O(rows)
        // Update the heights array for the current row
        for (let j = 0; j < cols; j++) { // O(cols)
            if (matrix[i][j] === '1') {
                heights[j]++;
            } else {
                heights[j] = 0;
            }
        }

        // Calculate the largest rectangle in the current histogram
        maxArea = Math.max(maxArea, largestRectangleArea(heights)); // O(cols)
    }

    return maxArea;
};