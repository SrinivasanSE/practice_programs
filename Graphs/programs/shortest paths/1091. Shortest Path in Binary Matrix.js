// https://leetcode.com/problems/shortest-path-in-binary-matrix/description/

/*

We start from the source and try to reach the destination by travelling in all 8 directions. We use dist array to track the dist of each node from the source

*/

/*

BFS

O(n^2) & O(n^2)

*/

var shortestPathBinaryMatrix = function (grid) {
  const n = grid.length;

  // Source (top-left) and Destination (bottom-right)
  const src = [0, 0],
    dest = [n - 1, n - 1];

  // If either start or end is blocked, no path is possible
  if (grid[src[0]][src[1]] == 1 || grid[dest[0]][dest[1]] == 1) return -1;

  if (n == 1) return 1;

  // dist[r][c] stores the shortest distance to reach cell (r, c)
  // Initialize with a large number (acts like infinity)
  const dist = Array.from({ length: n }, () => new Array(n).fill(1e9));

  // BFS queue storing: [row, col, distance_so_far]
  const q = [[src[0], src[1], 1]]; // we are using normal queue and not PQ, because the weight is constant and 1 only for all

  // Distance to the starting cell is 1 (path length counts the starting cell)
  dist[src[0]][src[1]] = 1;

  let row, col;

  // Standard BFS loop
  while (q.length > 0) {
    // Dequeue the front element
    const [r, c, d] = q.shift();

    // If destination is reached, return immediately
    // BFS guarantees this is the shortest path
    if (r == dest[0] && c == dest[1]) {
      return d;
    }

    // Explore all 8 possible directions
    // i and j represent row and column offsets
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        row = r + i;
        col = c + j;

        // Check:
        // 1. Inside grid bounds
        // 2. Cell is not blocked (0)
        // 3. We found a shorter path to this cell
        if (
          row >= 0 &&
          row < n &&
          col >= 0 &&
          col < n &&
          grid[row][col] == 0 &&
          d + 1 < dist[row][col]
        ) {
          // Update shortest distance
          dist[row][col] = d + 1;

          // // If destination is reached, return immediately
          // // BFS guarantees this is the shortest path
          // if (row == dest[0] && col == dest[1]) {
          //   return dist[row][col];
          // }

          // Push the next cell into the queue
          q.push([row, col, dist[row][col]]);
        }
      }
    }
  }

  // Destination not reachable
  return -1;
};

/*

BFS - No dist arr

O(n^2) & O(n^2)

*/

var shortestPathBinaryMatrix = function (grid) {
  const n = grid.length;

  // Source (top-left) and destination (bottom-right)
  const src = [0, 0],
    dest = [n - 1, n - 1];

  // If start or end is blocked, no path exists
  if (grid[src[0]][src[1]] == 1 || grid[dest[0]][dest[1]] == 1) return -1;

  // Edge case: single cell grid
  // Since start == end and it's not blocked
  if (n == 1) return 1;

  // BFS queue: [row, col, distance_so_far]
  const q = [[src[0], src[1], 1]];

  let row, col;

  // Mark the source as visited by blocking it
  // (prevents revisiting)
  grid[src[0]][src[1]] = 1;

  while (q.length > 0) {
    // Dequeue the current cell
    const [r, c, d] = q.shift();

    // Explore all 8 directions
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        row = r + i;
        col = c + j;

        // Check:
        // 1. Within bounds
        // 2. Cell is free (0 means unvisited & open)
        if (row >= 0 && row < n && col >= 0 && col < n && grid[row][col] == 0) {
          // If destination reached, return path length
          // BFS guarantees shortest path
          if (row == dest[0] && col == dest[1]) {
            return d + 1;
          }

          // Mark as visited immediately
          // This avoids multiple pushes of same cell
          grid[row][col] = 1;

          // Push next state into queue
          q.push([row, col, d + 1]);
        }
      }
    }
  }

  // Destination not reachable
  return -1;
};
