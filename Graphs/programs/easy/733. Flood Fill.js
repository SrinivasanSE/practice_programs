// https://leetcode.com/problems/flood-fill/description/

var floodFill = function (image, sr, sc, color) {
  if (image[sr][sc] == color) return image;

  const m = image.length;
  const n = image[0].length;

  const q = [[sr, sc]];
  const srcColor = image[sr][sc];
  image[sr][sc] = color;

  const dRow = [-1, 0, 1, 0];
  const dCol = [0, 1, 0, -1];
  while (q.length > 0) {
    const [row, col] = q.shift();

    for (let i = 0; i < 4; i++) {
      const r = row + dRow[i];
      const c = col + dCol[i];

      if (r >= 0 && r < m && c >= 0 && c < n && image[r][c] == srcColor) {
        q.push([r, c]);
        image[r][c] = color;
      }
    }
  }

  return image;
};

var floodFill = function (image, sr, sc, color) {
  if (image[sr][sc] == color) return image;

  const m = image.length;
  const n = image[0].length;

  const srcColor = image[sr][sc];

  const dir = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  const dfs = (r, c) => {
    if (r < 0 || r >= m || c < 0 || c >= n || image[r][c] != srcColor) return;

    image[r][c] = color;

    for (let [dr, dc] of dir) {
      dfs(r + dr, c + dc);
    }
  };

  dfs(sr, sc);
  return image;
};
