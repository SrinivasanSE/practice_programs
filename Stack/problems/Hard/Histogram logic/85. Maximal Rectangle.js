// https://leetcode.com/problems/maximal-rectangle/description/

/*

Optimal - Used 84 solution here

O(rows*cols) & (O(cols) + O(cols)) - for heights arr and stack inside the largestRectangleAre func

*/



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
            } else { // when it's 0, it should reset to 0
                heights[j] = 0;
            }
        }

        // Calculate the largest rectangle in the current histogram
        maxArea = Math.max(maxArea, largestRectangleArea(heights)); // O(cols)
    }

    return maxArea;
};