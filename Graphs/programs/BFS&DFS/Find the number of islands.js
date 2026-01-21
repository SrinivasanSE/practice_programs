// https://www.geeksforgeeks.org/problems/find-the-number-of-islands/1
// https://www.youtube.com/watch?v=muncqlKJrH0&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=9

/*

DFS

O(m*n) & O(m*n)

*/

class Solution {
  numIslands(grid) {
    // Number of rows
    const m = grid.length;

    // Number of columns
    const n = grid[0].length;

    // visited[r][c] → whether this cell is already processed
    const vis = Array.from({ length: m }, () =>
      new Array(n).fill(false)
    );

    // DFS to mark all connected land cells
    const dfs = (r, c) => {
      // Mark current cell as visited
      vis[r][c] = true;

      let nRow, nCol;

      // Loop through all 8 possible directions
      // (-1, -1) to (+1, +1)
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          nRow = r + i;
          nCol = c + j;

          // Check:
          // 1. Inside grid
          // 2. Cell is land
          // 3. Not visited
          if (
            nRow >= 0 &&
            nRow < m &&
            nCol >= 0 &&
            nCol < n &&
            grid[nRow][nCol] === "L" &&
            !vis[nRow][nCol]
          ) {
            dfs(nRow, nCol);
          }
        }
      }
    };

    let cnt = 0;

    // Traverse the entire grid
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        // Found a new island
        if (grid[i][j] === "L" && !vis[i][j]) {
          cnt++;
          dfs(i, j);
        }
      }
    }

    return cnt;
  }
}

/*

DFS

O(m*n) & O(m*n)

*/

class Solution {
  numIslands(grid) {
    const m = grid.length;
    const n = grid[0].length;

    const vis = Array.from({ length: m }, () =>
      new Array(n).fill(false)
    );

    const bfs = (r, c) => {
      // Queue for BFS traversal
      const q = [];

      // Mark starting cell visited
      vis[r][c] = true;
      q.push([r, c]);

      let nRow, nCol;

      while (q.length > 0) {
        const [row, col] = q.shift();

        // Explore all 8 directions
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            nRow = row + i;
            nCol = col + j;

            if (
              nRow >= 0 &&
              nRow < m &&
              nCol >= 0 &&
              nCol < n &&
              grid[nRow][nCol] === "L" &&
              !vis[nRow][nCol]
            ) {
              vis[nRow][nCol] = true;
              q.push([nRow, nCol]);
            }
          }
        }
      }
    };

    let cnt = 0;

    // Scan entire grid
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j] === "L" && !vis[i][j]) {
          cnt++;
          bfs(i, j);
        }
      }
    }

    return cnt;
  }
}

