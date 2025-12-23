// https://leetcode.com/problems/path-sum/description/

/*

Recursion

O(n) & O(n)

*/

// Helper function to check if a node is a leaf node
// A leaf node has no left and no right child
const isLeaf = (node) => node.left == null && node.right == null;

var hasPathSum = function (root, targetSum) {
  // Recursive helper function
  // node    → current tree node we are visiting
  // reqSum  → remaining sum needed to reach targetSum
  const check = (node, reqSum) => {
    // Base case 1: if the node is null, no path exists
    if (node == null) return false;

    // Base case 2: if this is a leaf node,
    // check whether the remaining sum equals this node's value
    if (isLeaf(node)) {
      return reqSum === node.val;
    }

    // Recursive case:
    // Subtract current node's value from required sum
    // and check either left or right subtree
    return (
      check(node.left, reqSum - node.val) ||
      check(node.right, reqSum - node.val)
    );
  };

  // Start recursion from the root with the full target sum
  return check(root, targetSum);
};
