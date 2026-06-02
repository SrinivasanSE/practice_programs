// https://leetcode.com/problems/set-matrix-zeroes/description/

/*

Brute

O((m+n)×m×n) & O(1)

*/

var setZeroes = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;

  // 1️⃣ First pass: Whenever a 0 is found,
  // mark its entire row and column using a special placeholder value (Infinity)
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        // Mark all cells in the same row and column
        markRow(matrix, i, n);
        markCol(matrix, j, m);
      }
    }
  }

  // 2️⃣ Second pass: Convert all marked cells (Infinity) to 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === Infinity) matrix[i][j] = 0;
    }
  }
};

// 🔹 Helper function to mark all elements in a row as Infinity (except already 0)
const markRow = (mat, row, n) => {
  for (let i = 0; i < n; i++) {
    if (mat[row][i] !== 0) {
      mat[row][i] = Infinity; // temporary marker
    }
  }
};

// 🔹 Helper function to mark all elements in a column as Infinity (except already 0)
const markCol = (mat, col, n) => {
  for (let i = 0; i < n; i++) {
    if (mat[i][col] !== 0) {
      mat[i][col] = Infinity; // temporary marker
    }
  }
};

/*

Better

O(m*n) & O(m + n)


*/

var setZeroes = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;

  // Arrays to mark which rows and columns should be set to zero
  const row = new Array(m).fill(0);
  const col = new Array(n).fill(0);

  // 1️⃣ First pass: record which rows and columns contain zeros
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        row[i] = 1; // mark this row for zeroing
        col[j] = 1; // mark this column for zeroing
      }
    }
  }

  // 2️⃣ Second pass: update the matrix based on the markers
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // If either this row or column was marked → set cell to zero
      if (row[i] === 1 || col[j] === 1) {
        matrix[i][j] = 0;
      }
    }
  }
};

/*

Optimal

O(m*n) & O(1)

*/

var setZeroes = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;

  // Flag to check if the **first column** needs to be zeroed
  // We can't use matrix[0][0] for this, since it overlaps
  // with the marker for the first row.
  let isCol = false;

  // 1️⃣ First pass — mark the rows and columns that need to be zeroed
  for (let i = 0; i < m; i++) {
    // If any element in the first column is zero,
    // mark that the first column needs to be zeroed later.
    if (matrix[i][0] === 0) isCol = true;

    // Start from column 1 (not 0) because column 0 is being tracked separately.
    for (let j = 1; j < n; j++) {
      // If the current cell is zero,
      // mark the first element of its row and column as zero.
      // These act as "markers" for which rows/cols to zero later.
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0; // mark row i
        matrix[0][j] = 0; // mark column j
      }
    }
  }

  // 2️⃣ Second pass — use the markers to set cells to zero
  // Skip the first row and first column for now (they are special cases).
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      // If the cell is not already zero,
      // check if its row or column was marked as zero earlier.
      if (matrix[i][j] !== 0) {
        if (matrix[i][0] === 0 || matrix[0][j] === 0) {
          // Either its row or column marker is zero → make this cell zero
          matrix[i][j] = 0;
        }
      }
    }
  }

  // 3️⃣ Handle the first row separately
  // If the top-left cell (matrix[0][0]) was marked as zero,
  // it means the first row should be zeroed out.
  if (matrix[0][0] === 0) {
    // this should the first handled and then only col should be handled, if col is handled first, it might mark the [0][0] as 0 and it will affect this
    for (let j = 0; j < n; j++) {
      matrix[0][j] = 0;
    }
  }

  // 4️⃣ Handle the first column separately
  // If `isCol` was set to true, zero out the entire first column.
  if (isCol) {
    for (let i = 0; i < m; i++) {
      matrix[i][0] = 0;
    }
  }
};
