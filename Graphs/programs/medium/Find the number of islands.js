// https://www.geeksforgeeks.org/problems/find-the-number-of-islands/1

class Solution {
  numIslands(grid) {
    // code here
    const m = grid.length;
    const n = grid[0].length;

    const vis = Array.from({ length: m }, () => new Array(n).fill(false));

    const dfs = (r, c) => {
      vis[r][c] = true;

      let nRow, nCol;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          nRow = r + i;
          nCol = c + j;

          if (
            nRow >= 0 &&
            nRow < m &&
            nCol >= 0 &&
            nCol < n &&
            grid[nRow][nCol] == "L" &&
            !vis[nRow][nCol]
          ) {
            dfs(nRow, nCol);
          }
        }
      }
    };
    let cnt = 0;
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j] == "L" && !vis[i][j]) {
          cnt++;
          dfs(i, j);
        }
      }
    }

    return cnt;
  }
}


class Solution {
  numIslands(grid) {
    // code here
    const m = grid.length;
    const n = grid[0].length;

    const vis = Array.from({ length: m }, () => new Array(n).fill(false));

    const bfs = (r, c) => {
      vis[r][c] = true;
      const q = [];
      q.push([r, c]);
      let nRow, nCol;

      while (q.length > 0) {
        const [row, col] = q.shift();

        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            nRow = row + i;
            nCol = col + j;

            if (
              nRow >= 0 &&
              nRow < m &&
              nCol >= 0 &&
              nCol < n &&
              grid[nRow][nCol] == "L" &&
              !vis[nRow][nCol]
            ) {
              q.push([nRow, nCol]);
              vis[nRow][nCol] = true;
            }
          }
        }
      }
    };
    let cnt = 0;
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j] == "L" && !vis[i][j]) {
          cnt++;
          bfs(i, j);
        }
      }
    }

    return cnt;
  }
}
