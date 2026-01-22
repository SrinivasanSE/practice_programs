// https://leetcode.com/problems/flood-fill/description/

/*

BFS

O(m*n) & O(m*n)

*/

var floodFill = function (image, sr, sc, color) {
  // If the starting pixel already has the target color,
  // nothing will change → avoid infinite loop
  if (image[sr][sc] == color) return image;

  const m = image.length; // number of rows
  const n = image[0].length; // number of columns

  // Queue for BFS traversal
  // Each element is [row, col]
  const q = [[sr, sc]];

  // Store the original color that we want to replace
  const srcColor = image[sr][sc];

  // Recolor the starting pixel immediately
  // (also acts as a visited mark)
  image[sr][sc] = color;

  // Direction vectors for 4-directional movement
  const dRow = [-1, 0, 1, 0];
  const dCol = [0, 1, 0, -1];

  // Standard BFS loop
  while (q.length > 0) {
    const [row, col] = q.shift();

    // Explore all 4 neighbors
    for (let i = 0; i < 4; i++) {
      const r = row + dRow[i];
      const c = col + dCol[i];

      // Check:
      // 1. Inside grid
      // 2. Has the original source color
      if (r >= 0 && r < m && c >= 0 && c < n && image[r][c] == srcColor) {
        // Push neighbor to queue for future processing
        q.push([r, c]);

        // Recolor immediately to avoid revisiting
        image[r][c] = color;
      }
    }
  }

  return image;
};

/*

DFS

O(m*n) & O(m*n)

*/

var floodFill = function (image, sr, sc, color) {
  // If starting pixel already has target color, stop
  if (image[sr][sc] == color) return image;

  const m = image.length;
  const n = image[0].length;

  // Store the original color to be replaced
  const srcColor = image[sr][sc];

  // Direction vectors
  const dir = [
    [-1, 0], // up
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
  ];

  // DFS helper function
  const dfs = (r, c) => {
    // Base cases:
    // 1. Out of bounds
    // 2. Different color → stop expansion
    if (r < 0 || r >= m || c < 0 || c >= n || image[r][c] != srcColor) return;

    // Recolor current pixel
    image[r][c] = color;

    // Recurse in all 4 directions
    for (let [dr, dc] of dir) {
      dfs(r + dr, c + dc);
    }
  };

  // Start DFS from source pixel
  dfs(sr, sc);

  return image;
};
