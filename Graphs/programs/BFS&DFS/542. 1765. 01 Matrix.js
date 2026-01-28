// https://leetcode.com/problems/01-matrix/description/
// https://leetcode.com/problems/map-of-highest-peak/description/

/*

Brute - Using bfs

O(m*n) & O(m*n)

*/

var updateMatrix = function (mat) {
  const m = mat.length; // number of rows
  const n = mat[0].length; // number of columns

  // ans[r][c] will store distance of cell (r, c) from nearest 0
  const ans = Array.from({ length: m }, () => new Array(n));

  // vis[r][c] tells whether a cell has already been visited in BFS
  const vis = Array.from({ length: m }, () => new Array(n));

  // Queue for BFS
  // Each element: [row, col, distanceFromNearestZero]
  const q = [];

  // Step 1: Initialize BFS with all 0-cells (multi-source BFS)
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] == 0) {
        // Distance of a zero cell from nearest zero is 0
        vis[i][j] = 1;
        q.push([i, j, 0]); // push all 0s into queue
      } else {
        // 1-cells are unvisited initially
        vis[i][j] = 0;
      }
    }
  }

  // 4 possible movement directions: up, right, down, left
  const dir = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  // Step 2: BFS traversal
  while (q.length > 0) {
    // Take the front element of the queue
    const [r, c, dist] = q.shift();

    // Store the distance in the answer matrix
    ans[r][c] = dist;

    // Explore all 4 neighbors
    for (let [row, col] of dir) {
      let nRow = r + row;
      let nCol = c + col;

      // Check bounds and whether the cell is unvisited
      if (nRow >= 0 && nRow < m && nCol >= 0 && nCol < n && !vis[nRow][nCol]) {
        // Mark as visited
        vis[nRow][nCol] = true;

        // Push neighbor with incremented distance
        q.push([nRow, nCol, dist + 1]);
      }
    }
  }

  return ans;
};

/*

Better - Using dist arr itself to track visited or not

O(m*n) & O(m*n)

*/

var updateMatrix = function (mat) {
  const m = mat.length;
  const n = mat[0].length;
  const dist = Array.from({ length: m }, () => new Array(n).fill(-1));
  const q = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] == 0) {
        dist[i][j] = 0;
        q.push([i, j]);
      }
    }
  }
  const dir = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  while (q.length > 0) {
    const [r, c] = q.shift();
    for (let [row, col] of dir) {
      let nRow = r + row;
      let nCol = c + col;

      if (
        nRow >= 0 &&
        nRow < m &&
        nCol >= 0 &&
        nCol < n &&
        dist[nRow][nCol] == -1
      ) {
        q.push([nRow, nCol]);
        dist[nRow][nCol] = dist[r][c] + 1;
      }
    }
  }

  return dist;
};

/*

Optimal - DP

O(m*n) & O(1)


*/

var updateMatrix = function (mat) {
  const rows = mat.length;
  const cols = mat[0].length;

  // Maximum possible distance in the grid is (rows - 1) + (cols - 1)
  // We use a safe upper bound so that any real distance will be smaller
  const INF = rows + cols;

  // =====================================================
  // STEP 1: PRE-PROCESSING
  // =====================================================
  // Convert all 1s into INF.
  // This means:
  // - 0 cells already have correct distance (0)
  // - 1 cells start with a very large distance and will be relaxed later
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (mat[i][j] !== 0) {
        mat[i][j] = INF;
      }
    }
  }

  // =====================================================
  // STEP 2: FIRST PASS (TOP-LEFT → BOTTOM-RIGHT)
  // =====================================================
  // In this traversal order:
  // - TOP (i - 1, j) has already been computed
  // - LEFT (i, j - 1) has already been computed
  // - BOTTOM and RIGHT are NOT processed yet
  //
  // So in this pass, we can ONLY safely use:
  //   - top
  //   - left
  //
  // This propagates distances coming from top and left directions.
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (mat[i][j] !== 0) {
        // top neighbor
        if (i > 0) {
          const top = mat[i - 1][j];
          mat[i][j] = Math.min(mat[i][j], top + 1);
        }

        // left neighbor
        if (j > 0) {
          const left = mat[i][j - 1];
          mat[i][j] = Math.min(mat[i][j], left + 1);
        }
      }
    }
  }

  // =====================================================
  // STEP 3: SECOND PASS (BOTTOM-RIGHT → TOP-LEFT)
  // =====================================================
  // In this reverse traversal order:
  // - BOTTOM (i + 1, j) has already been computed
  // - RIGHT  (i, j + 1) has already been computed
  // - TOP and LEFT were handled in the first pass
  //
  // Now we relax distances using:
  //   - bottom
  //   - right
  //
  // This completes consideration of all 4 directions.
  for (let i = rows - 1; i >= 0; i--) {
    for (let j = cols - 1; j >= 0; j--) {
      if (mat[i][j] !== 0) {
        // bottom neighbor
        if (i < rows - 1) {
          const bottom = mat[i + 1][j];
          mat[i][j] = Math.min(mat[i][j], bottom + 1);
        }

        // right neighbor
        if (j < cols - 1) {
          const right = mat[i][j + 1];
          mat[i][j] = Math.min(mat[i][j], right + 1);
        }
      }
    }
  }

  // After both passes:
  // - each cell has considered top, left, bottom, and right
  // - distances have propagated from every 0 in all directions
  // - result matches shortest distance to nearest 0
  return mat;
};
