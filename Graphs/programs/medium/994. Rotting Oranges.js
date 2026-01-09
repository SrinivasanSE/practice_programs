// https://leetcode.com/problems/rotting-oranges/description/

var orangesRotting = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  const visited = Array.from({ length: m }, () => new Array(n));

  let freshFruits = 0;
  const q = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] == 2) {
        q.push([i, j, 0]);
        visited[i][j] = 1;
      } else {
        visited[i][j] = 0;
      }

      if (grid[i][j] == 1) freshFruits++;
    }
  }

  let cnt = 0,
    time = 0;
  const dRow = [-1, 0, 1, 0];
  const dCol = [0, 1, 0, -1];

  while (q.length > 0) {
    const [row, col, t] = q.shift();
    time = Math.max(t, time);

    for (let r = 0; r < 4; r++) {
      let nRow = row + dRow[r];
      let nCol = col + dCol[r];

      if (
        nRow >= 0 &&
        nRow < m &&
        nCol >= 0 &&
        nCol < n &&
        visited[nRow][nCol] == 0 &&
        grid[nRow][nCol] == 1
      ) {
        q.push([nRow, nCol, time + 1]);
        cnt++;
        visited[nRow][nCol] = 1;
      }
    }
  }

  if (cnt != freshFruits) return -1;

  return time;
};

var orangesRotting = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  const visited = Array.from({ length: m }, () => new Array(n));

  let freshFruits = 0;
  const q = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] == 2) {
        q.push([i, j, 0]);
      }

      if (grid[i][j] == 1) freshFruits++;
    }
  }

  let cnt = 0,
    time = 0;
  const dRow = [-1, 0, 1, 0];
  const dCol = [0, 1, 0, -1];

  while (q.length > 0) {
    const [row, col, t] = q.shift();
    time = Math.max(t, time);

    for (let r = 0; r < 4; r++) {
      let nRow = row + dRow[r];
      let nCol = col + dCol[r];

      if (
        nRow >= 0 &&
        nRow < m &&
        nCol >= 0 &&
        nCol < n &&
        grid[nRow][nCol] == 1
      ) {
        q.push([nRow, nCol, time + 1]);
        cnt++;
        grid[nRow][nCol] = 2;
      }
    }
  }

  if (cnt != freshFruits) return -1;

  return time;
};
