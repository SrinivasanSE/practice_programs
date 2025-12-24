// https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected/description/

/*

O(2n) & O(2n)

*/

// Smilar to 863 program

const findParents = (root, target, parents, parent) => {
  if (root == null) return null;
  parents.set(root, parent);

  if (root.val === target) {
    return root;
  }

  return (
    findParents(root.left, target, parents, root) ||
    findParents(root.right, target, parents, root)
  );
};

const bfs = (target, parents) => {
  let visited = new Set();
  let maxDist = -1;
  const q = [[target, 0]];

  while (q.length > 0) {
    const [node, dist] = q.shift();
    if (visited.has(node)) continue; // not needed
    visited.add(node);
    maxDist = dist;

    if (node.left && !visited.has(node.left)) {
      q.push([node.left, dist + 1]);
    }
    if (node.right && !visited.has(node.right)) {
      q.push([node.right, dist + 1]);
    }
    const parent = parents.get(node);
    if (parent && !visited.has(parent)) {
      q.push([parent, dist + 1]);
    }
  }

  return maxDist;
};

var amountOfTime = function (root, start) {
  if (root === null) return 0;
  const parents = new Map();
  let targetNode;
  if (root.val === start) {
    targetNode = root;
  } else {
    targetNode = findParents(root, start, parents, null);
  }
  return bfs(targetNode, parents);
};

/*

Recursion - DFS

O(n) & O(h)

*/

var amountOfTime = function (root, start) {
  // Result stores the maximum time needed to infect all nodes
  let result = 0;

  // DFS function traverses tree and returns either:
  // - positive number: height of subtree if target not found in this subtree
  // - negative number: distance from current node to target if target found
  const DFS = function (node, start) {
    if (node == null) return 0; // null node has height 0

    // Post-order: compute left and right depths first
    let leftDepth = DFS(node.left, start);
    let rightDepth = DFS(node.right, start);

    // If this node is the target, update result with maximum depth of subtree
    if (node.val == start) {
      result = Math.max(leftDepth, rightDepth); // farthest node downward from target
      return -1; // signal to parent that target found at distance 0
    }
    // If target is not in either subtree, return height of this subtree
    if (leftDepth >= 0 && rightDepth >= 0)
      return Math.max(leftDepth, rightDepth) + 1;

    // If target is in exactly one subtree (one negative, one positive)
    // Update result: distance to farthest node through this ancestor
    result = Math.max(result, Math.abs(leftDepth - rightDepth)); // if leftDepth is -2, rightdepth is 1, -2 - 1 = -3 res = 3

    // Return distance to target (negative number) to propagate upwards
    return Math.min(leftDepth, rightDepth) - 1;
  };

  DFS(root, start); // start DFS from root
  return result; // final answer: time to infect all nodes
};

/*

Imagine this configuration:

       node
      /    \
   (infected) (healthy)


Suppose infection came from the left side.

leftDepth = -2 (infection 2 edges below)

rightDepth = 3 (the right subtree height = 3)

Now infection passes through this node.
How long will it take for infection to reach the farthest node in the right subtree?

➡️ It must travel:

2 edges up (from start up to current node)

1 edge down into right subtree

3 more edges to the deepest right node

That’s equivalent to abs(leftDepth - rightDepth) = abs(-2 - 3) = 5.

So the infection will take 5 minutes from the start to reach that deepest right node.

*/
