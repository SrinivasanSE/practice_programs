// https://leetcode.com/problems/diameter-of-binary-tree/description/

/*

Brute 

O(n^2) & O(n)

*/

const height = (root) => {
  if (root == null) return null;

  const lh = height(root.left);
  const rh = height(root.right);

  return 1 + Math.max(lh, rh);
};
var diameterOfBinaryTree = function (root) {
  let max = 0;
  const find = (node) => {
    // find the height from each node
    if (node == null) return 0;

    const lh = height(node.left);
    const rh = height(node.right);

    max = Math.max(max, lh + rh); // the diameter will be the left + right tree height only, we need to take the max

    find(node.left);
    find(node.right);
  };
  find(root);
  return max;
};

/*

Optimal

O(n) & O(n)

*/

var diameterOfBinaryTree = function (root) {
  let max = 0;

  var find = function (root) {
    if (!root) {
      return 0;
    }

    let l = dfs(root.left);
    let r = dfs(root.right);

    max = Math.max(max, l + r);

    return 1 + Math.max(l, r);
  };

  find(root);
  return max;
};
