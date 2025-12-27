// https://leetcode.com/problems/delete-node-in-a-bst/description/

/*

Iterative

O(n) & O(1)


*/

// Deletes a node with value = key from a Binary Search Tree
var deleteNode = function (root, key) {
  // Base case: empty tree → nothing to delete
  if (root == null) return root;

  // Special case: the node to delete is the root itself
  // We delegate deletion logic to helper() and return the new root
  if (root.val == key) {
    return helper(root);
  }

  // We will traverse the tree iteratively to find the node
  let curr = root;

  // Traverse until we either find the node or reach a null pointer
  while (curr) {
    // If key is greater, it must be in the right subtree
    if (curr.val < key) {
      // Check if the right child is the node to delete
      if (curr.right && curr.right.val === key) {
        // Delete curr.right and reconnect the returned subtree
        curr.right = helper(curr.right);

        // Deletion is done, exit loop
        break;
      }

      // Otherwise, move right
      curr = curr.right;
    } else {
      // If key is smaller or equal, it must be in the left subtree

      // Check if the left child is the node to delete
      if (curr.left && curr.left.val === key) {
        // Delete curr.left and reconnect the returned subtree
        curr.left = helper(curr.left);

        // Deletion is done, exit loop
        break;
      }

      // Otherwise, move left
      curr = curr.left;
    }
  }

  // Root remains unchanged unless root itself was deleted
  return root;
};

// Helper function that deletes a given node
// and returns the new root of this subtree
const helper = (node) => {
  // Case 1: Node has NO left child
  // Replace node with its right child
  if (node.left == null) {
    return node.right;
  }

  // Case 2: Node has NO right child
  // Replace node with its left child
  if (node.right == null) {
    return node.left;
  }

  // Case 3: Node has TWO children
  // Strategy:
  // - Take the right subtree
  // - Attach it to the rightmost node of the left subtree
  // - Return left subtree as the new root

  //   Example:

  //     BEFORE deletion (node = 10):

  //             10
  //            /  \
  //           5    15
  //          / \
  //         2   7

  //     Step 1: Find the rightmost node in left subtree → 7

  //     Step 2: Attach right subtree (15) to 7.right

  //     AFTER deletion:

  //             5
  //            / \
  //           2   7
  //                \
  //                 15

  // Save the right subtree
  const rightNode = node.right;

  // Find the rightmost (maximum) node in the left subtree
  const lastNode = getLastRightNode(node.left);

  // Attach the original right subtree here
  lastNode.right = rightNode;

  // Return the left child as the new root of this subtree
  return node.left;
};

// Finds the rightmost (maximum value) node in a subtree
const getLastRightNode = (node) => {
  // If there is no right child, this is the rightmost node
  if (node.right == null) {
    return node;
  }

  // Otherwise, keep moving right
  return getLastRightNode(node.right);
};

// Above version - Traversing the left node's right and attaching the right node to it and returning the left tree
// Another version - Traversing the right node's left and adding the left node to it and returning the right tree

// Helper function to delete a node from a BST
// It returns the NEW ROOT of the subtree after deletion
const _helper = (node) => {

    // Case 1: Node has NO left child
    // Simply replace the node with its right subtree
    // (all values in right subtree are already greater than node.val)
    if (node.left == null) return node.right;

    // Case 2: Node has NO right child
    // Simply replace the node with its left subtree
    // (all values in left subtree are already smaller than node.val)
    if (node.right == null) return node.left;

    /*
      Case 3: Node has TWO children

      Strategy (mirror version of predecessor approach):
      - Take the LEFT subtree
      - Attach it to the LEFTMOST node of the RIGHT subtree
      - Return the RIGHT subtree as the new root

      Example:

      BEFORE deletion (node = 10):

              10
             /  \
            5    15
           / \
          2   7

      Step 1: Save left subtree (rooted at 5)

      Step 2: Find the LEFTMOST node in the right subtree → 15

      Step 3: Attach left subtree as 15.left

      AFTER deletion:

              15
             /
            5
           / \
          2   7

      Why this works:
      - All nodes in left subtree are < 10
      - All nodes in right subtree are > 10
      - The leftmost node in the right subtree is the SMALLEST
        node greater than 10, so attaching left subtree there
        preserves BST ordering
    */

    const leftNode = node.left;                 // Save the left subtree
    const lastNode = lastLeftNode(node.right); // Find smallest node in right subtree
    lastNode.left = leftNode;                   // Attach left subtree here

    // Return the right subtree as the new root of this subtree
    return node.right;
};

// Finds the LEFTMOST node in a subtree (minimum value)
// This is used to locate where the left subtree should be attached
const lastLeftNode = (node) => {

    // If there is no left child, this node is the leftmost (smallest)
    if (node.left == null) return node;

    // Keep moving left until we find the leftmost node
    return lastLeftNode(node.left);
};


/*

Recursion 

O(n) & O(n)

*/

var deleteNode = function (root, key) {
  if (root == null) return root;

  if (root.val < key) {
    root.right = deleteNode(root.right, key);
  } else if (root.val > key) {
    root.left = deleteNode(root.left, key);
  } else {
    // when the node is equal to key
    if (root.left == null && root.right == null) return null;

    if (root.left == null) return root.right;
    if (root.right == null) return root.left;

    const lastNode = getLastLeftNode(root.right); // get the last left node from the right
    root.val = lastNode.val; // replace the val
    root.right = deleteNode(root.right, root.val); // delete the lastNode we found from the right tree
  }

  return root;
};

const getLastLeftNode = (node) => {
  if (node.left == null) {
    return node;
  }

  return getLastLeftNode(node.left);
};
