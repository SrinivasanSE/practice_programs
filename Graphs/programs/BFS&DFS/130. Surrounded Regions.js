// https://leetcode.com/problems/surrounded-regions/description/

// We run DFS from all border Os to mark safe regions, then flip all remaining Os because they must be surrounded

/*

BFS

O(m*n) & O(m*n)

*/

// BFS to mark all 'O' cells that are connected to a border 'O'
const bfs = (i, j, vis, board, m, n) => {
  // Queue for BFS traversal
  const q = [[i, j]];

  // Mark the starting border cell as visited (safe)
  vis[i][j] = true;

  // Standard BFS loop
  while (q.length > 0) {
    const [row, col] = q.shift();

    // 4-directional movement: top, right, bottom, left
    const dir = [
      [-1, 0], // top
      [0, 1], // right
      [1, 0], // bottom
      [0, -1], // left
    ];

    // Explore all neighboring cells
    for (let [r, c] of dir) {
      const nRow = row + r;
      const nCol = col + c;

      // Conditions to move to a neighbor:
      // 1. Inside the board boundaries
      // 2. Not visited already
      // 3. Cell contains 'O' (can be part of a safe region)
      if (
        nRow >= 0 &&
        nRow < m &&
        nCol >= 0 &&
        nCol < n &&
        !vis[nRow][nCol] &&
        board[nRow][nCol] === "O"
      ) {
        // Mark neighbor as visited (safe)
        vis[nRow][nCol] = true;

        // Add neighbor to BFS queue
        q.push([nRow, nCol]);
      }
    }
  }
};

var solve = function (board) {
  const m = board.length; // number of rows
  const n = board[0].length; // number of columns

  // vis[i][j] = true means:
  // cell (i, j) is an 'O' connected to the border and should NOT be flipped
  const vis = Array.from({ length: m }, () => new Array(n).fill(false));

  // --------------------------------------------------
  // STEP 1: BFS from the TOP and BOTTOM border rows
  // --------------------------------------------------
  for (let j = 0; j < n; j++) {
    // Top row
    if (!vis[0][j] && board[0][j] === "O") {
      bfs(0, j, vis, board, m, n);
    }

    // Bottom row
    if (!vis[m - 1][j] && board[m - 1][j] === "O") {
      bfs(m - 1, j, vis, board, m, n);
    }
  }

  // --------------------------------------------------
  // STEP 2: BFS from the LEFT and RIGHT border columns
  // --------------------------------------------------
  for (let i = 0; i < m; i++) {
    // Left column
    if (!vis[i][0] && board[i][0] === "O") {
      bfs(i, 0, vis, board, m, n);
    }

    // Right column
    if (!vis[i][n - 1] && board[i][n - 1] === "O") {
      bfs(i, n - 1, vis, board, m, n);
    }
  }

  // --------------------------------------------------
  // STEP 3: Flip all unvisited 'O's to 'X'
  // --------------------------------------------------
  // Any 'O' that was NOT visited:
  // - is not connected to the border
  // - is fully surrounded by 'X'
  // Hence, it must be flipped
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!vis[i][j] && board[i][j] === "O") {
        board[i][j] = "X";
      }
    }
  }
};

/*

DFS

O(m*n) & O(m*n)

*/

// DFS to mark all 'O' cells that are connected to a border 'O'
const dfs = (i, j, vis, board, m, n) => {
  // BASE CASES:
  // 1. Out of grid bounds
  // 2. Already visited cell
  // 3. Cell is 'X' (cannot be part of a safe region)
  if (i < 0 || i >= m || j < 0 || j >= n || vis[i][j] || board[i][j] === "X")
    return;

  // Mark the current cell as visited
  // This means this 'O' is connected to the border and is SAFE
  vis[i][j] = true;

  // Explore all 4 directions (up, right, down, left)
  dfs(i - 1, j, vis, board, m, n); // top
  dfs(i, j + 1, vis, board, m, n); // right
  dfs(i + 1, j, vis, board, m, n); // bottom
  dfs(i, j - 1, vis, board, m, n); // left
};

var solve = function (board) {
  const m = board.length; // number of rows
  const n = board[0].length; // number of columns

  // vis[i][j] = true means:
  // cell (i, j) is an 'O' that is connected to the border
  const vis = Array.from({ length: m }, () => Array(n).fill(false));

  // --------------------------------------------------
  // STEP 1: Run DFS from the TOP and BOTTOM borders
  // --------------------------------------------------
  for (let j = 0; j < n; j++) {
    // top row
    if (!vis[0][j] && board[0][j] === "O") {
      dfs(0, j, vis, board, m, n);
    }

    // bottom row
    if (!vis[m - 1][j] && board[m - 1][j] === "O") {
      dfs(m - 1, j, vis, board, m, n);
    }
  }

  // --------------------------------------------------
  // STEP 2: Run DFS from the LEFT and RIGHT borders
  // --------------------------------------------------
  for (let i = 0; i < m; i++) {
    // left column
    if (!vis[i][0] && board[i][0] === "O") {
      dfs(i, 0, vis, board, m, n);
    }

    // right column
    if (!vis[i][n - 1] && board[i][n - 1] === "O") {
      dfs(i, n - 1, vis, board, m, n);
    }
  }

  // --------------------------------------------------
  // STEP 3: Flip all unvisited 'O's to 'X'
  // --------------------------------------------------
  // Any 'O' that is NOT visited is:
  // - not connected to the border
  // - completely surrounded by 'X'
  // Hence, it must be flipped
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!vis[i][j] && board[i][j] === "O") {
        board[i][j] = "X";
      }
    }
  }
};
