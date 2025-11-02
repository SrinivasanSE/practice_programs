// https://leetcode.com/problems/spiral-matrix/description/

/*

Optimal

O(n*m) & O(n + m)

*/


var spiralOrder = function (matrix) {
    const r = matrix.length              // Number of rows
    const c = matrix[0].length           // Number of columns

    let top = 0                          // Top boundary (first untraversed row)
    let bottom = r - 1                   // Bottom boundary (last untraversed row)
    let left = 0                         // Left boundary (first untraversed column)
    let right = c - 1                    // Right boundary (last untraversed column)

    const res = []                       // Store spiral order result

    // Keep looping while we still have rows and columns left to traverse
    while (top <= bottom && left <= right) {

        // 1️⃣ Traverse from Left ➜ Right across the current 'top' row
        for (let i = left; i <= right; i++) {
            res.push(matrix[top][i])
        }
        top++                            // Move the 'top' boundary down (row is done)

        // 2️⃣ Traverse from Top ➜ Bottom along the current 'right' column
        for (let i = top; i <= bottom; i++) {
            res.push(matrix[i][right])
        }
        right--                          // Move the 'right' boundary left (column is done)

        // 3️⃣ Traverse from Right ➜ Left across the current 'bottom' row (if any row left)
        if (top <= bottom) {             // Check avoids duplicate traversal
            for (let i = right; i >= left; i--) {
                res.push(matrix[bottom][i])
            }
            bottom--                     // Move 'bottom' boundary up
        }

        // 4️⃣ Traverse from Bottom ➜ Top along the current 'left' column (if any col left)
        if (left <= right) {             // Check avoids duplicate traversal
            for (let i = bottom; i >= top; i--) {
                res.push(matrix[i][left])
            }
            left++                       // Move 'left' boundary right
        }
    }

    return res                           // Return final spiral traversal
};

