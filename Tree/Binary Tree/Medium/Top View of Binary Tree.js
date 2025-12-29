// https://www.geeksforgeeks.org/dsa/print-nodes-top-view-binary-tree/#naive-approach-using-hashmap-on-log-n-time-and-on-space

/*

DFS

O(nlogn) for sorting & O(n)


*/

function dfs(node, hd, level, topNodes) {
  if (node === null) return;

  // If horizontal distance is encountered for
  // the first time or if it's at a higher level
  if (!(hd in topNodes) || topNodes[hd][1] > level) {
    // we need to push the top level value only, so if we have already pushed a higher level node at the bottom, we replace it
    topNodes[hd] = [node.data, level];
  }

  // Recur for left and right subtrees
  dfs(node.left, hd - 1, level + 1, topNodes);
  dfs(node.right, hd + 1, level + 1, topNodes);
}

function topView(root) {
  const result = [];
  if (root === null) return result;

  // Horizontal distance -> [node's value, level]
  const topNodes = {};

  // Start DFS traversal
  dfs(root, 0, 0, topNodes);

    // We can track min and max and then just run for loop from min to max, no need of sorting
    
  // Collect nodes from the map sorted by horizontal distance
  const sortedKeys = Object.keys(topNodes)
    .map(Number)
    .sort((a, b) => a - b);
  for (const key of sortedKeys) {
    result.push(topNodes[key][0]);
  }

  return result;
}

/*

BFS

O(n) & O(n)

*/

class Solution {
  // from the top, if we look, we need to print the nodes which are visible, we draw a line and the first node on the line from the top, we need to print
  topView(root) {
    let res = [];
    if (!root) return res;

    let q = [];
    let map = {}; // Use object for direct access
    let minLine = 0,
      maxLine = 0;

    q.push([root, 0]);

    while (q.length > 0) {
      const [node, line] = q.shift();

      if (map[line] === undefined) {
        // if it's not there already, then only add it
        map[line] = node.data;
      }

      minLine = Math.min(minLine, line); // this is for returning the output in correct order, from -2 to 2 like that
      maxLine = Math.max(maxLine, line);

      if (node.left) q.push([node.left, line - 1]);
      if (node.right) q.push([node.right, line + 1]);
    }

    // Collect results in order without sorting
    for (let i = minLine; i <= maxLine; i++) {
      if (map[i] !== undefined) {
        res.push(map[i]);
      }
    }

    return res;
  }
}
