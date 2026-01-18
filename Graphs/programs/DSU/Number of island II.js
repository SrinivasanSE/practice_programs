// https://www.geeksforgeeks.org/problems/number-of-islands/1

/*

We start with:

An empty grid (water everywhere)

Each operator turns one water cell into land

After each operation, we must tell:

“How many islands exist right now?”

Key Observations

Each new land cell starts as a new island

If it touches existing land (up/down/left/right), those islands merge

So:

Add land → islands +1
Merge with neighbor → islands −1

*/

/*

DSU

O(k * α(rows * cols)) ≈ O(k) & O(rows * cols + k)

*/

class Solution {
  // Function to count the number of islands after each operation
  numOfIslands(rows, cols, operators) {
    // vis[r][c] = 1 → land
    // vis[r][c] = 0 → water
    const vis = Array.from({ length: rows }, () => new Array(cols).fill(0));

    // DSU for all cells (flattened index: r * cols + c)
    const ds = new DisJointSet(rows * cols);

    let count = 0; // current number of islands
    const ans = [];

    // Directions: up, right, down, left
    const dr = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];

    for (let [row, col] of operators) {
      // If land already exists → island count unchanged
      if (vis[row][col]) {
        ans.push(count);
        continue;
      }

      // New land always creates a new island
      count++;
      vis[row][col] = 1;

      // Convert (row, col) to 1D index
      const curr = row * cols + col;

      // Check all 4 neighbors
      for (let [r, c] of dr) {
        const nRow = row + r;
        const nCol = col + c;

        // Check boundaries and if neighbor is land
        if (
          nRow >= 0 &&
          nRow < rows &&
          nCol >= 0 &&
          nCol < cols &&
          vis[nRow][nCol]
        ) {
          const adj = nRow * cols + nCol;

          // If they belong to different islands → merge
          if (ds.findPar(curr) !== ds.findPar(adj)) {
            count--; // islands merged
            ds.unionBySize(curr, adj);
          }
        }
      }

      // Record island count after this operation
      ans.push(count);
    }

    return ans;
  }
}
