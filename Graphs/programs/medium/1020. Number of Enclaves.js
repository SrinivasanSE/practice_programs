// https://leetcode.com/problems/number-of-enclaves/description/

// Similar to 130 - we can use the same code, just we need to count here

var numEnclaves = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  const vis = Array.from({ length: m }, () => new Array(n).fill(false));
  const dir = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  const bfs = (i, j) => {
    vis[i][j] = true;
    const q = [[i, j]];

    while (q.length > 0) {
      const [r, c] = q.shift();

      for (let [dr, dc] of dir) {
        const nRow = r + dr;
        const nCol = c + dc;

        if (
          nRow >= 0 &&
          nRow < m &&
          nCol >= 0 &&
          nCol < n &&
          !vis[nRow][nCol] &&
          grid[nRow][nCol] == 1
        ) {
          vis[nRow][nCol] = true;
          q.push([nRow, nCol]);
        }
      }
    }
  };

  for (j = 0; j < n; j++) {
    if (!vis[0][j] && grid[0][j] == 1) {
      bfs(0, j);
    }
    if (!vis[m - 1][j] && grid[m - 1][j] == 1) {
      bfs(m - 1, j);
    }
  }

  for (i = 0; i < m; i++) {
    if (!vis[i][0] && grid[i][0] == 1) {
      bfs(i, 0);
    }
    if (!vis[i][n - 1] && grid[i][n - 1] == 1) {
      bfs(i, n - 1);
    }
  }

  let count = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!vis[i][j] && grid[i][j] == 1) count++;
    }
  }

  return count;
};
