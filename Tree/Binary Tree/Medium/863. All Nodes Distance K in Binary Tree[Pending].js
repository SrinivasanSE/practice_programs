// https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/description/
// https://www.geeksforgeeks.org/dsa/print-nodes-distance-k-given-node-binary-tree/

// Check how we can find parent without using map and recursive version

/*

Iterative - BFS

O(n) & O(n)

*/

const mapParents = (root, target, parents) => {
  const q = [root];
  let targetNode = null,
    node;

  while (q.length > 0) {
    node = q.shift();

    if (node.val === target) {
      targetNode = node;
    }

    if (node.left) {
      q.push(node.left);
      parents.set(node.left, node);
    }

    if (node.right) {
      q.push(node.right);
      parents.set(node.right, node);
    }
  }

  return targetNode;
};

const mapParentsRecur = (node, parent, par = null) => { // Recursive implementation for mapping parents
  if (!node) return;
  parent.set(node, par);
  dfs(node.left, node);
  dfs(node.right, node);
};

const bfs = (target, parents, k) => {
  const q = [[target, 0]];

  const res = [];
  let visited = new Set(),
    parent; // we use visited to track the visited nodes,
  // since we go upwards and downwards for each node, we should not be visiting the same node again

  while (q.length > 0) {
    const [node, dist] = q.shift(); // track dist of each node
    if (dist === k) {
      // if the distance is same as k, add to res
      res.push(node.val);
      continue;
    }
    if (dist > k) return res; // if we have moved to the next depth which is greater than k, we can return
    visited.add(node);

    if (node.left && !visited.has(node.left)) {
      // check if the node has left and not visited before
      q.push([node.left, dist + 1]);
    }
    if (node.right && !visited.has(node.right)) {
      q.push([node.right, dist + 1]);
    }
    parent = parents.get(node);
    if (parent && !visited.has(parent)) {
      q.push([parent, dist + 1]);
    }
  }

  return res;
};

/*

We should be able to traverse to the top and bottom as well to find the nodes at k distance. So we need to know the parent to traverse to top.
So using bfs or dfs, we can store the parent for each node in a map.
After that, we can start going to left, right, parent starting from the target node and track the dist. If the dist is same as k, store the nodes in the res.

*/

var distanceK = function (root, target, k) {
  let parents = new Map();
  parents.set(root, null);
  const targetNode = mapParents(root, target, parents); // use this func to map the parents for each node
  // and also retutn the parent node if the target given is a value and not a node. Here it's a node, so we don't use that returned value

  return bfs(target, parents, k);
};
