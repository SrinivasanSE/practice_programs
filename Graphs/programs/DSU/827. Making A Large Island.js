// https://leetcode.com/problems/making-a-large-island/description/



/*

Core Intuition (Very Important)
Step 1: First connect all existing 1s

Treat every 1 cell as a node

Union adjacent 1s into connected components (islands)

Each island’s size is tracked using DSU

Step 2: Try flipping each 0

Flipping 0 → 1 can connect multiple neighboring islands

Use a Set to avoid counting the same island twice

New island size =

1 (flipped cell) + sum of sizes of unique neighboring islands

Step 3: Take the maximum

*/

/*

DSU

O(n^2) & O(n^2)

*/

var largestIsland = function (grid) {
  const n = grid.length;

  // DSU to manage n*n nodes (flattened grid)
  const ds = new DisJointSet(n * n);

  // 4-directional movement
  const dr = [
    [-1, 0], // up
    [0, 1],  // right
    [1, 0],  // down
    [0, -1], // left
  ];

  let countOfZeros = 0;

  // -------------------------------
  // STEP 1: Union all adjacent 1s
  // -------------------------------
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {

      // Count zeros (used for edge cases later)
      if (grid[row][col] === 0) {
        countOfZeros++;
        continue;
      }

      // Current cell index in DSU
      const curr = row * n + col;

      // Check 4 neighbors
      for (let [r, c] of dr) {
        const nRow = row + r;
        const nCol = col + c;

        // If neighbor is valid and land, union them
        if (
          nRow >= 0 && nRow < n &&
          nCol >= 0 && nCol < n &&
          grid[nRow][nCol] === 1
        ) {
          const adj = nRow * n + nCol;
          ds.unionBySize(curr, adj);
        }
      }
    }
  }

  // -------------------------------
  // Edge Cases
  // -------------------------------
  if (countOfZeros === 0) return n * n; // already all land
  if (countOfZeros === n * n) return 1; // flip one cell

  // -------------------------------
  // STEP 2: Try flipping each 0
  // -------------------------------
  let max = 0;

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {

      // Only flip zeros
      if (grid[row][col] === 1) continue;

      const components = new Set(); // to avoid duplicate islands
      let islandSize = 1; // flipped cell itself

      for (let [r, c] of dr) {
        const nRow = row + r;
        const nCol = col + c;

        if (
          nRow >= 0 && nRow < n &&
          nCol >= 0 && nCol < n &&
          grid[nRow][nCol] === 1
        ) {
          const adj = nRow * n + nCol;
          components.add(ds.findPar(adj));
        }
      }

      // Add sizes of all unique neighboring islands
      for (let comp of components) {
        islandSize += ds.size[comp];
      }

      max = Math.max(max, islandSize);
    }
  }

  return max;
};

/*

Why Set is Required
Example:
1 1
1 0


Flipping bottom-right:

All neighbors belong to same island

Without Set, you’d add size 3 multiple times ❌

With Set, counted once ✅

*/