// https://leetcode.com/problems/path-with-minimum-effort/description/

// TODO: Learn Binary search approach

/*

We use Dijkstra BFS algo, the abs height diff btw between two cells is the effort required to move. We try to find the min effort to reach the destination.
In Dijkstra, you may exit only when the destination is popped, never when it is pushed.

*/

/*

BFS - Dijkstra

O(E log V)
 & O(mn)

*/

var minimumEffortPath = function (heights) {
  const m = heights.length,
    n = heights[0].length;

  // dist[r][c] = minimum effort required to reach cell (r, c)
  // Initialize all cells with a very large value (infinity)
  const dist = Array.from({ length: m }, () => new Array(n).fill(1e9));

  // Min-heap priority queue
  // Each element is [currentEffort, row, col]
  // The cell with the smallest effort is always processed first
  const pq = new PriorityQueue((a, b) => a[0] - b[0]);

  // Start from (0,0) with effort = 0
  pq.enqueue([0, 0, 0]);
  dist[0][0] = 0;

  // 4 possible directions: up, right, down, left
  const dir = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  let nRow, nCol, newEffort;

  // Dijkstra's algorithm loop
  while (!pq.isEmpty()) {
    // Always extract the cell with minimum effort so far
    const [effort, r, c] = pq.dequeue();

    // ✅ Safe early exit:
    // First time we pop destination from PQ,
    // its effort is guaranteed to be minimum, as we use PQ, the subsequent items in the PQ will have efforts equal or greater than this only
    if (r == m - 1 && c == n - 1) return effort;

    // Explore all neighbors
    for (let [i, j] of dir) {
      nRow = r + i;
      nCol = c + j;

      // Check grid boundaries
      if (nRow >= 0 && nRow < m && nCol >= 0 && nCol < n) {
        // Effort to move to neighbor:
        // max(previous effort, height difference)
        newEffort = Math.max(
          effort,
          Math.abs(heights[nRow][nCol] - heights[r][c])
        );

        // Relaxation step
        if (newEffort < dist[nRow][nCol]) {
          dist[nRow][nCol] = newEffort;
          pq.enqueue([newEffort, nRow, nCol]);
        }
      }
    }
  }

  return 0;
};
