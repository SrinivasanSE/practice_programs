// https://leetcode.com/problems/flatten-binary-tree-to-linked-list/description/

/*

Recursion

O(n) & O(n)

*/


/*
Example Tree (BEFORE flatten):

        1
       / \
      2   5
     / \   \
    3   4   6

Expected Tree (AFTER flatten):
(All left pointers are null, right pointers form a linked list)

1 → 2 → 3 → 4 → 5 → 6
*/

var flatten = function (root) {
  // `prev` will point to the previously processed node
  // in the flattened linked list.
  // Initially null because no nodes are processed yet.
  let prev = null;

  const makeFlat = (root) => {
    // Base case:
    // If the node is null, nothing to process
    if (root == null) {
      return;
    }

    /*
      We use REVERSE PREORDER traversal:
      right → left → root

      Why?
      Because we want to build the linked list from the END backwards.

      Processing order for the example tree:
      6 → 5 → 4 → 3 → 2 → 1
    */

    // Step 1: Flatten the right subtree first
    makeFlat(root.right);

    // Step 2: Flatten the left subtree
    makeFlat(root.left);

    /*
      Step 3: Rewire pointers

      At this point, `prev` already points to the
      flattened list of nodes that come AFTER `root`.

      Example:
      When root = 4
      prev = 5 → 6

      We do:
      4.right = prev   → 4 → 5 → 6
      4.left  = null
    */

    root.right = prev; // attach current node to the flattened list
    root.left = null;  // left must be null for linked list

    /*
      Step 4: Move `prev` pointer

      Now current node becomes the previous node
      for its parent in recursion.
    */
    prev = root;
  };

  // Start flattening from the root
  makeFlat(root);

  // Return the root of the flattened tree
  return root;
};


/*

Iterative - Stack

O(n) & O(n)

*/

var flatten = function (root) {
  // If the tree is empty, nothing to flatten
  if (root == null) return null;

  // Stack to simulate preorder traversal (root → left → right)
  let stk = [root],
      curr;

  // Continue until all nodes are processed
  while (stk.length > 0) {

    // Pop the top node from the stack
    curr = stk.pop();

    /*
      IMPORTANT:
      Push RIGHT child first, then LEFT child.

      Why?
      Stack is LIFO, so pushing right first ensures
      that the left child is processed before the right child,
      maintaining preorder traversal order.
    */

    if (curr.right) {
      stk.push(curr.right);
    }

    if (curr.left) {
      stk.push(curr.left);
    }

    /*
      After pushing children:
      - The top of the stack is the next node in preorder traversal
      - We link current node's right pointer to that node
    */
    if (stk.length > 0) {
      curr.right = stk[stk.length - 1];
    }

    // Since we are flattening into a linked list,
    // left pointer must always be null
    curr.left = null;
  }

  // Root now represents the head of the flattened linked list
  return root;
};


/*

Iterative - Morris traversal

O(n) & O(1)


*/

var flatten = function (root) {
  if (root == null) return null;
  let curr = root,
    prev;
  while (curr) {
    if (curr.left != null) {
      prev = curr.left;
      while (prev.right) {
        // move right as much as possible
        prev = prev.right;
      }

      prev.right = curr.right; // connect the right most node to the curr's right
      curr.right = curr.left; // make the curr right as curr left
      curr.left = null; // reset the left
    }
    curr = curr.right; // move to right, the right is changed inside the if loop, so if changed, it will move to left
  }

  return root;
};

/*

Brute

O(n) & O(n)

*/

var flatten = function (root) {
  if (!root) return;
  const nodes = [];

  function preorder(node) {
    if (!node) return;
    nodes.push(node);
    preorder(node.left);
    preorder(node.right);
  }

  preorder(root);
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].left = null;
    nodes[i].right = nodes[i + 1];
  }
};
