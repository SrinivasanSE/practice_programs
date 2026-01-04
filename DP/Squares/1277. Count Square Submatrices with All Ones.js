// https://leetcode.com/problems/count-square-submatrices-with-all-ones/description/

/*

Brute Force (Complex) - need to understand

O(m×n×(min(m,n))^2) & O(1)

we try for maxSize in each iteration, 1 + 2 + 3 + .... maxSize = n(n+ 1)/2 = maxSize^2 

maxSize = min(m, n)

*/

function countSquaresBrute(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let total = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {

      if (matrix[i][j] === 1) {
        // count the 1x1 square
        total++;

        // maximum possible size from (i,j) without going outside matrix
        let maxSize = Math.min(rows - i, cols - j);
        let size = 1;

        // try larger sizes 2..maxSize
        while (size < maxSize) {
          size++;          // now attempting 'size x size'
          let valid = true;

          // check newly added right column of the size x size square
          for (let x = i; x < i + size; x++) {
            if (matrix[x][j + size - 1] === 0) {
              valid = false;
              break;
            }
          }

          // check newly added bottom row of the size x size square
          if (valid) {
            for (let y = j; y < j + size; y++) {
              if (matrix[i + size - 1][y] === 0) {
                valid = false;
                break;
              }
            }
          }

          if (!valid) break; // cannot expand further from (i,j)
          total++;           // found another valid square of this size
        }
      }

    }
  }

  return total;
}


/*

Optimal

O(rows*col) & O(rows*cols)

*/


var countSquares = function (matrix) {
    const rows = matrix.length
    const cols = matrix[0].length

    // dp[i][j] will store the size of the largest square 
    // that ends at cell (i, j) — i.e., whose bottom-right corner is (i, j)
    const dp = Array.from({ length: rows }, () => new Array(cols).fill(0))

    let sum = 0 // total count of all square submatrices of 1s

    // Iterate through every cell in the matrix
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {

            // Only process if the current cell is 1
            if (matrix[row][col] === 1) {

                // Base case: first row or first column
                // Cells in first row/column can only form 1x1 squares.
                if (row === 0 || col === 0) {
                    dp[row][col] = 1
                } 
                else {
                    /* 
                     * The key DP relation:
                     *
                     * dp[row][col] = 1 + min(
                     *      dp[row-1][col],     // top cell
                     *      dp[row][col-1],     // left cell
                     *      dp[row-1][col-1]    // top-left diagonal cell
                     * )
                     *
                     * Explanation:
                     * To form a square ending at (row, col),
                     * we need all three neighboring directions
                     * (top, left, and top-left) to also form squares.
                     *
                     * - dp[row-1][col]    → how large a square ends just above (row, col)
                     * - dp[row][col-1]    → how large a square ends just left of (row, col)
                     * - dp[row-1][col-1]  → how large a square ends diagonally up-left
                     *
                     * The smallest of these three determines the maximum size 
                     * we can extend the square by 1.
                     *
                     * For example:
                     * If top=2, left=2, diagonal=1 → only a 1x1 square can extend → dp[row][col] = 1 + 1 = 2
                     * If all three are 2 → we can make a 3x3 → dp[row][col] = 1 + 2 = 3
                     *
                     * So this ensures the new square is limited by the smallest adjacent square.
                     */
                    dp[row][col] = 1 + Math.min(
                        dp[row - 1][col - 1],  // top-left diagonal
                        dp[row - 1][col],      // top
                        dp[row][col - 1]       // left
                    )
                }

                // Each dp[row][col] value represents:
                // how many square submatrices end at (row, col).
                // So we add that to the total.
                sum += dp[row][col]
            }
        }
    }

    return sum // total number of square submatrices with all 1s
};


// If we can modify the matrix itself


var countSquares = function (matrix) {
    const n = matrix.length
    const m = matrix[0].length

    let sum = 0

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (matrix[i][j] === 1 && i > 0 && j > 0) { // i and j should be greater than 0 as we need neighbours, if i == 0, j == 0, we will just add the value present in that cell
                matrix[i][j] = 1 + Math.min(matrix[i - 1][j - 1], matrix[i - 1][j], matrix[i][j - 1])
            }
            sum += matrix[i][j]
        }
    }

    return sum
};