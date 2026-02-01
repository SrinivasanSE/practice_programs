// https://leetcode.com/problems/swim-in-rising-water/description/

/*

Each cell has a height.

Water level rises over time.

You can move only when both cells are ≤ current water level.

Find the minimum time to reach (n-1, n-1).

👉 Equivalent rephrasing:

Find a path from start to end such that the maximum height along the path is minimized.

This is called a Minimax Path Problem.


/*

BFS - Dijkstra

TC - O(N log N) = O(n² log n²) = O(n² log n)

SC - O(n^2)


*/

var swimInWater = function (grid) {
  const n = grid.length;

  // Min-heap priority queue
  // Each element: [maxHeightSoFar, row, col]
  const pq = new PriorityQueue((a, b) => a[0] - b[0]);

  // Visited matrix to avoid revisiting cells
  const vis = Array.from({ length: n }, () => new Array(n).fill(0));

  // Start from top-left
  vis[0][0] = 1;
  pq.enqueue([grid[0][0], 0, 0]);

  // 4-directional movement
  const dir = [
    [-1, 0], // up
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
  ];

  while (!pq.isEmpty()) {
    // Extract cell with minimum maxHeight so far
    const [maxHeight, row, col] = pq.dequeue();

    // If destination reached, this is the minimum possible time
    if (row === n - 1 && col === n - 1) {
      return maxHeight;
    }

    // Explore neighbors
    for (let [dr, dc] of dir) {
      const nRow = row + dr;
      const nCol = col + dc;

      // Valid and unvisited neighbor
      if (nRow >= 0 && nRow < n && nCol >= 0 && nCol < n && !vis[nRow][nCol]) {
        // Time needed to reach this neighbor
        const newMaxHeight = Math.max(maxHeight, grid[nRow][nCol]);

        pq.enqueue([newMaxHeight, nRow, nCol]);
        vis[nRow][nCol] = 1;
      }
    }
  }

  return -1; // should never happen
};

/*

DFS + BS

O(n^2logn) & O(n^2)

*/

/*

If you can reach the destination at time t, then you can also reach it at any time t' > t.

This property is called monotonicity, and it screams binary search.

Why binary search works here

Imagine increasing water level:

| Time | Path Exists? |
| ---- | ------------ |
| 2    | ❌ No         |
| 3    | ❌ No         |
| 4    | ✅ Yes        |
| 5    | ✅ Yes        |
| 6    | ✅ Yes        |

Once it becomes possible, it stays possible forever.

So we want:

the smallest t such that a path exists

That’s exactly what binary search finds.

Once it becomes possible, it stays possible forever.

So we want:

the smallest t such that a path exists

That’s exactly what binary search finds.


*/

var swimInWater = function (grid) {
  const n = grid.length;

  // 4-directional movement
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  // Check if destination is reachable when water level = t
  function canReach(t) {
    // Track visited cells to avoid infinite loops
    const visited = Array.from({ length: n }, () => Array(n).fill(false));

    function dfs(x, y) {
      // If we reached bottom-right, path exists
      if (x === n - 1 && y === n - 1) return true;

      visited[x][y] = true;

      // Try moving in all 4 directions
      for (const [dx, dy] of dirs) {
        const nx = x + dx,
          ny = y + dy;

        // Conditions:
        // 1. Inside grid
        // 2. Not visited
        // 3. Cell height <= water level (important!)
        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < n &&
          ny < n &&
          !visited[nx][ny] &&
          grid[nx][ny] <= t
        ) {
          if (dfs(nx, ny)) return true;
        }
      }
      return false;
    }

    // You must be able to stand on the start cell
    return dfs(0, 0);
  }

  // Minimum possible time must allow start & end cells
  let left = Math.max(grid[0][0], grid[n - 1][n - 1]);

  // Maximum height in grid is n*n - 1
  let right = n * n - 1;

  // Binary search for minimum valid time
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (canReach(mid)) {
      // Path exists → try smaller time
      right = mid - 1;
    } else {
      // Path doesn't exist → need more water
      left = mid + 1;
    }
  }

  return left;
};

/*

1️⃣ What does a cell value actually represent?

Each cell value represents:

The height of the ground at that cell

📌 Not water, not cost, not time
It is literally how tall that square is.

Example:

grid = [
  [0, 2],
  [1, 3]
]


This means:

Cell	Height
(0,0)	0 (very low)
(0,1)	2
(1,0)	1
(1,1)	3 (very tall)
2️⃣ What does “water level” mean?

Water level = current time

At time t = 0, water level = 0

At time t = 1, water level = 1

At time t = 2, water level = 2

...

So water rises uniformly everywhere.

3️⃣ When can you stand on a cell?

You can stand on a cell only if:

water level ≥ cell height

Why?

Imagine real water:

If a block is taller than water, it is sticking out

You cannot swim onto it until water reaches its height

📌 You are swimming, not climbing.

4️⃣ Why you cannot move if cell value is higher?

Let’s say:

Water level = 1

You want to move into a cell with height 3

water level (1)
──────────────
      ███  ← height 3 cell (still dry)


🚫 That cell is not submerged yet, so you cannot enter it.

You must wait until:

water level ≥ 3

5️⃣ Why BOTH cells must be ≤ water level

To move from A → B:

You must be able to stand in A

You must be able to enter B

So:

grid[A] ≤ water level
grid[B] ≤ water level


Otherwise:

If A is too tall → you can’t even stand there

If B is too tall → you can’t enter it

*/
