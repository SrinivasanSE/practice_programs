// https://leetcode.com/problems/rotting-oranges/description/

/*

DFS does not work for this problem. DFS explores paths.Reaches cells via long paths first. BFS explores time.
Oranges rotting is a time problem, not a path problem.

This is a classic multi-source BFS

Start BFS from all rotten oranges

Track time using BFS levels

If some fresh oranges remain → -1

*/

/*

BFS with vis arr

O(m*n) & O(m*n)

*/

var orangesRotting = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  // visited[r][c] → whether this cell is already processed (rotted)
  const visited = Array.from({ length: m }, () => new Array(n));

  let freshFruits = 0; // total number of fresh oranges
  const q = []; // BFS queue: [row, col, time]

  // Step 1: Scan grid
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // If orange is already rotten, push to queue
      if (grid[i][j] == 2) {
        q.push([i, j, 0]); // time = 0
        visited[i][j] = 1;
      } else {
        visited[i][j] = 0;
      }

      // Count fresh oranges
      if (grid[i][j] == 1) freshFruits++;
    }
  }

  let cnt = 0; // number of fresh oranges that got rotten
  let time = 0;

  // Directions: up, right, down, left
  const dRow = [-1, 0, 1, 0];
  const dCol = [0, 1, 0, -1];

  // Step 2: BFS
  while (q.length > 0) {
    const [row, col, t] = q.shift();

    // Track maximum time reached
    time = Math.max(time, t);

    for (let r = 0; r < 4; r++) {
      let nRow = row + dRow[r];
      let nCol = col + dCol[r];

      // Valid cell + fresh orange + not visited
      if (
        nRow >= 0 &&
        nRow < m &&
        nCol >= 0 &&
        nCol < n &&
        visited[nRow][nCol] == 0 &&
        grid[nRow][nCol] == 1
      ) {
        q.push([nRow, nCol, time + 1]);
        cnt++; // one fresh orange rotted
        visited[nRow][nCol] = 1; // mark visited
      }
    }
  }

  // If some fresh oranges never got rotten
  if (cnt != freshFruits) return -1;

  return time;
};

/*

BFS with no vis arr

O(m*n) & O(m*n)

*/

var orangesRotting = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  let freshFruits = 0;
  const q = [];

  // Step 1: Initial scan
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // Push all rotten oranges
      if (grid[i][j] == 2) {
        q.push([i, j, 0]);
      }

      // Count fresh oranges
      if (grid[i][j] == 1) freshFruits++;
    }
  }

  let cnt = 0; // rotted fresh oranges
  let time = 0;

  const dRow = [-1, 0, 1, 0];
  const dCol = [0, 1, 0, -1];

  // Step 2: BFS
  while (q.length > 0) {
    const [row, col, t] = q.shift();
    time = Math.max(time, t);

    for (let r = 0; r < 4; r++) {
      let nRow = row + dRow[r];
      let nCol = col + dCol[r];

      // Only check for fresh oranges
      if (
        nRow >= 0 &&
        nRow < m &&
        nCol >= 0 &&
        nCol < n &&
        grid[nRow][nCol] == 1
      ) {
        q.push([nRow, nCol, time + 1]);
        cnt++;

        // Mark as rotten directly in grid
        grid[nRow][nCol] = 2;
      }
    }
  }

  if (cnt != freshFruits) return -1;
  return time;
};
