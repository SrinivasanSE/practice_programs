// https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/description/

/*

You can remove a stone if there is another stone in the same row or column.

👉 This means:

Stones that share a row/column are connected

From each connected component, you can remove all stones except one

So:

Answer = total stones − number of connected components

*/

/*

BFS

O(n^2) & O(n)

*/

/**
 * @param {number[][]} stones
 * @return {number}
 */
var removeStones = function (stones) {
    const n = stones.length;

    /*
    ======================================================
    INTUITION (HIGH LEVEL)
    ======================================================

    Rule:
    - A stone can be removed if there exists another stone
      in the SAME ROW or SAME COLUMN.

    Observation:
    - Stones that share a row or column are CONNECTED.
    - A group of connected stones forms a CONNECTED COMPONENT.

    Key idea:
    - From each connected component, we can remove all stones
      except ONE.
    - So answer = total stones - number of connected components

    This solution:
    - Build a graph where:
        * Each stone is a node
        * An edge exists if two stones share row or column
    - Count connected components using DFS
    ======================================================
    */

    // visited[i] = 1 → stone i already visited in DFS
    const vis = new Array(n).fill(0);

    /*
    ======================================================
    STEP 1: BUILD GRAPH (ADJACENCY LIST)
    ======================================================

    Node:
      - Each stone index (0 to n-1)

    Edge:
      - Between stone i and j if:
            same row OR same column

    Example:
      stones = [[0,0], [0,1], [1,0], [2,2]]

      Connections:
        0 ↔ 1 (same row)
        0 ↔ 2 (same column)

      Graph:
        0: [1,2] stone 0 connected with stone 1 and stone 2, (number indicates index)
        1: [0]
        2: [0]
        3: []  (isolated stone)
    */

    const adj = Array.from({ length: n }, () => []);

    // Compare every pair of stones
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {

            // If same row OR same column → connect them
            if (
                stones[i][0] === stones[j][0] ||
                stones[i][1] === stones[j][1]
            ) {
                adj[i].push(j);
                adj[j].push(i);
            }
        }
    }

    /*
    ======================================================
    STEP 2: DFS TO MARK A CONNECTED COMPONENT
    ======================================================

    DFS(node):
      - Mark current stone as visited
      - Visit all stones connected to it

    Example:
      Starting DFS at stone 0:
        visits 0 → 1 → 2
    */

    const dfs = (node) => {
        vis[node] = 1;

        for (let nei of adj[node]) {
            if (!vis[nei]) {
                dfs(nei);
            }
        }
    };

    /*
    ======================================================
    STEP 3: COUNT CONNECTED COMPONENTS
    ======================================================

    Logic:
    - Each time we find an unvisited stone,
      it means a NEW connected component.
    - Run DFS to mark entire component.

    Example:
      stones = [[0,0], [0,1], [1,0], [2,2]]

      Components:
        Component 1 → stones {0,1,2}
        Component 2 → stone {3}

      components = 2
    */

    let components = 0;

    for (let i = 0; i < n; i++) {
        if (!vis[i]) {
            components++;   // found a new component
            dfs(i);         // mark all stones in this component
        }
    }

    /*
    ======================================================
    STEP 4: FINAL ANSW
    ======================================================

    From each connected component:
      - We must keep at least ONE stone
      - We can remove the rest

    So:
      removable stones = total stones - components

    Example:
      n = 4
      components = 2
      answer = 4 - 2 = 2
    */

    return n - components;
};


/*

DSU

O(n) & O(n)

*/

var removeStones = function (stones) {
  const n = stones.length;

  /*
  ======================================================
  INTUITION (HIGH LEVEL)
  ======================================================

  Rule:
  - A stone can be removed if there exists ANOTHER stone
    in the SAME ROW or SAME COLUMN.

  Key observation:
  - Stones connected by row/column form a CONNECTED COMPONENT.
  - From each connected component, we can remove all stones
    except ONE.

  Therefore:
  Answer = total stones - number of connected components

  The challenge:
  - How to efficiently find connected components when
    connections are based on rows and columns?

  Solution:
  - Use Disjoint Set (Union Find)
  - Treat each ROW and each COLUMN as a NODE
  - Each stone connects (row x) <-> (column y)
  ======================================================
  */

  /*
  ======================================================
  STEP 1: FIND MAX ROW AND MAX COLUMN
  ======================================================

  Why?
  - We need to create DSU nodes for:
      rows  : 0 ... maxRow
      cols  : shifted to avoid collision

  Example:
    stones = [[0,0], [2,3]]

    maxRow = 2
    maxCol = 3
  */

  let maxRow = 0,
    maxCol = 0;

  for (let [x, y] of stones) {
    maxRow = Math.max(x, maxRow);
    maxCol = Math.max(y, maxCol);
  }

  /*
  ======================================================
  STEP 2: CREATE DSU FOR ROWS + COLUMNS
  ======================================================

  IMPORTANT QUESTION:
  Why size = (maxRow + maxCol + 1)?

  - Row nodes     : 0 .... maxRow
  - Column nodes  : (maxRow + 1) .... (maxRow + maxCol + 1)

  This SHIFT ensures:
  - Row indices NEVER collide with column indices

  Example:
    maxRow = 2, maxCol = 3

    Row nodes:        0, 1, 2
    Column nodes:     3, 4, 5, 6

    Total nodes = 7 (0 to 6)
  */

  const ds = new DisJointSet(maxRow + maxCol + 1);

  /*
  ======================================================
  STEP 3: UNION ROW AND COLUMN FOR EACH STONE
  ======================================================

  For each stone (x, y):
    - Treat row x as a node
    - Treat column y as a node
    - Connect them in DSU

  Mapping:
    rowNode = x
    colNode = maxRow + y + 1  (SHIFTED!)

  Example:
    stones = [[0,1]]
    maxRow = 2

    rowNode = 0
    colNode = 2 + 1 + 1 = 4

    union(0, 4)
  */

  for (let [x, y] of stones) {
    const row = x;
    const col = maxRow + y + 1; // shift column index to avoid collision
    ds.unionBySize(row, col);
  }

  /*
  ======================================================
  STEP 4: COUNT CONNECTED COMPONENTS
  ======================================================

  Key idea:
  - Each connected component corresponds to ONE group
    of stones connected via rows/columns.

  BUT:
  - DSU also contains nodes that never appeared in stones
  - We must NOT count those!

  So we only count:
    1) parent[i] === i   → root of component
    2) size[i] > 1       → component actually has a stone

  Why size > 1?
  - A single unused row or column node will have size = 1
  - We only care about components formed by stones
  */

  let components = 0;

  for (let i = 0; i < maxRow + maxCol + 1; i++) {
    if (ds.parent[i] === i && ds.size[i] > 1) {
      components++;
    }
  }

  /*
  ======================================================
  STEP 5: FINAL ANSW
  ======================================================

  From each connected component:
    - We can remove all stones except ONE

  So:
    removable stones =
      total stones - number of components

  Example:
    stones = 6
    components = 2

    Answer = 6 - 2 = 4
  */

  return n - components;
};



/*

🔑 Why do we take maxRow + maxCol + 1?
Short answer:

👉 We are creating separate DSU nodes for rows and columns, and we must avoid index collision between them.

Step 1: What are we actually unioning?

In this solution:

Rows are nodes

Columns are nodes

Each stone connects:

(row x) ↔ (column y)


So each stone = one edge in a graph between a row-node and a column-node.

Step 2: Why can’t we use row and column indices directly?

Suppose stones are:

stones = [[0,1], [1,0]]


If we do this ❌:

union(x, y)


Then:

Row 0 → node 0

Column 1 → node 1

Row 1 → node 1 ❌ COLLISION!

Column 0 → node 0 ❌ COLLISION!

👉 Row nodes and column nodes overlap, breaking DSU logic.

Step 3: The fix — OFFSET columns

We shift column indices so they live in a different range than rows.

Row nodes:
0 ... maxRow

Column nodes:
(maxRow + 1) ... (maxRow + maxCol + 1)


This guarantees:
✔ No row index = any column index

*/