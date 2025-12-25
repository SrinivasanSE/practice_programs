// https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/description/
// https://www.geeksforgeeks.org/dsa/vertical-order-traversal-of-binary-tree-using-map/

// Check GFG variation at the last

/*

Recursion - DFS

O(nlogn) & O(n)

*/

var verticalTraversal = function (root) {
  if (root == null) return root;
  let nodes = [];
  const dfs = (node, row, col) => {
    if (node == null) return;

    nodes.push([node.val, row, col]);
    dfs(node.left, row + 1, col - 1);
    dfs(node.right, row + 1, col + 1);
  };

  dfs(root, 0, 0); // for each node, create the mappings

  /*
  Sorting priority:

    Column first → left to right

    Row second → top to bottom

    Value last → tie breaker

  */
  nodes.sort((a, b) => {
    if (a[2] != b[2]) return a[2] - b[2]; // sort by col (vertical index)
    if (a[1] != b[1]) return a[1] - b[1]; // sort by row (level)
    return a[0] - b[0]; // sort by value
  });

  let prevCol = null,
    res = [];
  for (let [node, row, col] of nodes) {
    if (col != prevCol) {
      // we use prevCol to group the same cols together
      res.push([]);
      prevCol = col;
    }
    res[res.length - 1].push(node);
  }

  return res;
};

/*

Iterative - BFS

O(nlogn) & O(n)

*/

var verticalTraversal = function (root) {
  if (root == null) return root;
  let nodes = [];

  let q = [[root, 0, 0]];

  while (q.length > 0) {
    const [node, row, col] = q.shift();

    nodes.push([node.val, row, col]);

    if (node.left) {
      q.push([node.left, row + 1, col - 1]);
    }
    if (node.right) {
      q.push([node.right, row + 1, col + 1]);
    }
  }

  nodes.sort((a, b) => {
    if (a[2] != b[2]) return a[2] - b[2];
    if (a[1] != b[1]) return a[1] - b[1];
    return a[0] - b[0];
  });

  let prevCol = null,
    res = [];
  for (let [node, row, col] of nodes) {
    if (col != prevCol) {
      res.push([]);
      prevCol = col;
    }
    res[res.length - 1].push(node);
  }

  return res;
};

// slight optimised version which prevents col sorting

var verticalTraversal = function (root) {
  if (!root) return [];

  const map = new Map(); // col -> [[value, row]]
  const queue = [[root, 0, 0]]; // [node, col, row]
  let min = 0,
    max = 0;

  while (queue.length > 0) {
    const [node, col, row] = queue.shift();

    if (!map.has(col)) map.set(col, []);
    map.get(col).push([node.val, row]); // push only value and row (level)

    min = Math.min(min, col);
    max = Math.max(max, col);

    if (node.left) queue.push([node.left, col - 1, row + 1]);
    if (node.right) queue.push([node.right, col + 1, row + 1]);
  }

  const res = [];
  // Nlogk, total nodes = N and assuming each col has k nodes
  for (let c = min; c <= max; c++) {
    // use the min and max and no need to sort by col
    const arr = map.get(c);
    if (arr.length > 1) {
      arr.sort((a, b) => {
        if (a[1] !== b[1]) return a[1] - b[1];
        return a[0] - b[0];
      });
    }
    res.push(arr.map(([val]) => val));
  }

  return res;
};


/*

In GFG variation, there is no need to sort by values and also if we use level order traversal, it will be sorted by level as well. So we can directly add to the result

*/


function verticalOrder(root) {
    if (!root) return [];

    // Map to store nodes and their vertical levels
    const lst = new Map();

    // Use our custom queue
    const q = new Queue();
    q.enqueue([root, 0]);

    let mn = 0, mx = 0;

    while (!q.isEmpty()) {
        const [node, val] = q.dequeue();

        mn = Math.min(mn, val);
        mx = Math.max(mx, val);

        if (!lst.has(val)) lst.set(val, []);
        lst.get(val).push(node.data);

        if (node.left) q.enqueue([node.left, val - 1]);
        if (node.right) q.enqueue([node.right, val + 1]);
    }

    // Build the result in vertical order
    const res = [];
    for (let i = mn; i <= mx; i++) {
        res.push(lst.get(i));
    }

    return res;
}