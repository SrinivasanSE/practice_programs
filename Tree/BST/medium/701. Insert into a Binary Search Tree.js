// https://leetcode.com/problems/insert-into-a-binary-search-tree/description/

/*

Recursion

O(n) & O(n)

*/

var insertIntoBST = function (root, val) {
  // Base case:
  // If we reach a null position, this is the correct
  // place to insert the new value in the BST.
  if (root == null) {
    return new TreeNode(val);
  }

  // If the value to insert is greater than the current node,
  // it must go into the right subtree (BST property).
  if (root.val < val) {
    // Recursively insert into the right subtree
    // and attach the returned subtree back to root.right
    root.right = insertIntoBST(root.right, val);
  } else {
    // If the value is smaller than or equal to the current node,
    // it must go into the left subtree.
    // (Equal values are typically placed on the left,
    // depending on the BST definition.)
    root.left = insertIntoBST(root.left, val);
  }

  // Return the unchanged root node so that
  // parent recursive calls can reconnect properly
  return root;
};

/*

Iterative

O(n) & O(1)

*/

var insertIntoBST = function (root, val) {
  let curr = root;
  const node = new TreeNode(val);
  if (curr == null) return node;
  while (curr) {
    if (curr.val < val) {
      if (curr.right == null) {
        curr.right = node;
        break;
      }
      curr = curr.right;
    } else {
      if (curr.left == null) {
        curr.left = node;
        break;
      }
      curr = curr.left;
    }
  }
  return root;
};
