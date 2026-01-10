// https://www.geeksforgeeks.org/problems/number-of-distinct-islands/1

/*

BFS

O(m*n) & O(m*n)

*/

/*

This is similar to Number of islands program, we need to track the distinct islands, for that we use set and push the island co ordinates to that. To normalize the island shape
we subtract from the base/starting index of the island. The set size is the no of distinct islands.

*/

class Solution {
  countDistinctIslands(grid) {
    // Number of rows and columns
    const m = grid.length;
    const n = grid[0].length;

    // Visited matrix to ensure each cell is processed only once
    const vis = Array.from({ length: m }, () => new Array(n).fill(false)); // instead of using vis arr, we can use the grid arr itself to track by assigning -1 for visited

    // Set to store unique island shapes
    // Each island shape is stored as a string representation
    const set = new Set();

    // Direction vectors for DFS traversal (Up, Right, Down, Left)
    const dir = [
      [-1, 0], // top
      [0, 1], // right
      [1, 0], // bottom
      [0, -1], // left
    ];

    /**
     * DFS to explore an island and record its shape
     *
     * @param {number} i   - current row
     * @param {number} j   - current column
     * @param {Array} arr  - stores relative coordinates of island cells
     * @param {number} i0  - starting row of the island
     * @param {number} j0  - starting column of the island
     */
    const dfs = (i, j, arr, i0, j0) => {
      // Store the relative position of the current cell
      // This normalizes the island shape independent of its location
      arr.push(`${i - i0},${j - j0}`);

      // Mark current cell as visited
      vis[i][j] = true;

      // Explore all 4 possible directions
      for (let [dr, dc] of dir) {
        const nRow = i + dr;
        const nCol = j + dc;

        // Check boundaries, visited status, and land condition
        if (
          nRow >= 0 &&
          nRow < m &&
          nCol >= 0 &&
          nCol < n &&
          !vis[nRow][nCol] &&
          grid[nRow][nCol] === 1
        ) {
          dfs(nRow, nCol, arr, i0, j0);
        }
      }
    };

    // Traverse the entire grid
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        // If the cell is unvisited land, it starts a new island
        if (!vis[i][j] && grid[i][j] === 1) {
          // Temporary array to store this island’s shape
          const temp = [];

          // Run DFS from this cell
          dfs(i, j, temp, i, j);

          // Convert the shape into a string and store in set
          // Set automatically handles uniqueness
          set.add(JSON.stringify(temp));
        }
      }
    }

    // Number of distinct island shapes
    return set.size;
  }
}


/*

Two islands are same shape if their structure is identical, even if they are in different positions.

Example:

Island 1 cells: (2,2), (2,3), (3,2)
Island 2 cells: (5,6), (5,7), (6,6)


Relative positions:

(0,0), (0,1), (1,0)


✔ Same shape → counted once.

*/