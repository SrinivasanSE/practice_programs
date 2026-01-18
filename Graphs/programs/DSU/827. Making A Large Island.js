// https://leetcode.com/problems/making-a-large-island/description/

var largestIsland = function (grid) {
  const n = grid.length;
  const ds = new DisJointSet(n * n);
  const dr = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  let nRow, nCol, offsetI, offsetAdjI;
  let countOfZeros = 0;

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (grid[row][col] == 0) {
        countOfZeros++;
        continue;
      }
      for (let [r, c] of dr) {
        nRow = row + r;
        nCol = col + c;
        if (
          nRow >= 0 &&
          nRow < n &&
          nCol >= 0 &&
          nCol < n &&
          grid[nRow][nCol] == 1
        ) {
          offsetI = row * n + col;
          offsetAdjI = nRow * n + nCol;

          ds.unionBySize(offsetI, offsetAdjI);
        }
      }
    }
  }

  if (countOfZeros == 0) return n * n;
  if (countOfZeros == n * n) return 1;

  let max = 0,
    noOfIslands = 0;

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (grid[row][col] == 1) {
        continue;
      }

      const components = new Set();
      noOfIslands = 1;
      for (let [r, c] of dr) {
        nRow = row + r;
        nCol = col + c;

        if (
          nRow >= 0 &&
          nRow < n &&
          nCol >= 0 &&
          nCol < n &&
          grid[nRow][nCol] == 1
        ) {
          offsetAdjI = nRow * n + nCol;
          components.add(ds.findPar(offsetAdjI));
        }
      }

      for (let comp of components) {
        noOfIslands += ds.size[comp];
      }

      max = Math.max(max, noOfIslands);
    }
  }

  return max;
};
