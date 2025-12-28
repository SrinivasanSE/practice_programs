// https://www.geeksforgeeks.org/inorder-predecessor-successor-given-key-bst/

/*

For a given key in a BST:

Predecessor (pre) → largest value smaller than key

Successor (succ) → smallest value greater than key

*/

/*

Brute - two traversal

O(h) & O(1)

*/

class Solution {
  findPreSuc(root, key) {
    // code here
    let curr = root,
      pre = null,
      succ = null;

    while (curr) {
      if (curr.data <= key) {
        curr = curr.right;
      } else {
        succ = curr;
        curr = curr.left;
      }
    }
    curr = root;
    while (curr) {
      if (curr.data < key) {
        pre = curr;
        curr = curr.right;
      } else {
        curr = curr.left;
      }
    }

    return [pre, succ];
  }
}

/*

Optimised - Single traversal

O(h) & O(1)

*/

class Solution {
  findPreSuc(root, key) {
    // curr is used to traverse the BST
    let curr = root;

    // pre  → predecessor (largest value < key)
    // succ → successor   (smallest value > key)
    let pre = null;
    let succ = null;

    // Traverse the BST similar to a normal BST search
    while (curr) {
      // CASE 1: current node value is smaller than key
      // → this node can be a potential predecessor
      if (curr.data < key) {
        pre = curr; // update predecessor
        curr = curr.right; // move right to find a closer value
      }

      // CASE 2: current node value is greater than key
      // → this node can be a potential successor
      else if (curr.data > key) {
        succ = curr; // update successor
        curr = curr.left; // move left to find a closer value
      }

      // CASE 3: current node value equals the key
      else {
        /*
          When the key is found:

          - Predecessor is the largest value smaller than key
            → It will be in the LEFT subtree
            → Specifically, the RIGHTMOST node of left subtree

          - Successor is the smallest value greater than key
            → It will be in the RIGHT subtree
            → Specifically, the LEFTMOST node of right subtree

          Example:

                 20
               /    \
             10      30
               \
               15

          key = 20
          predecessor = 15
          successor   = 30
        */

        // Find predecessor from left subtree (if it exists)
        if (curr.left) {
          pre = rightMost(curr.left);
        }

        // Find successor from right subtree (if it exists)
        if (curr.right) {
          succ = leftMost(curr.right);
        }

        // Key is handled, exit the loop
        break;
      }
    }

    // Return predecessor and successor
    return [pre, succ];
  }
}

// Helper function to find the maximum value in a BST subtree
// (the rightmost node is always the largest)
const rightMost = (node) => {
  // Keep moving to the right child until it doesn't exist
  while (node.right) {
    node = node.right;
  }
  return node; // largest node in that subtree
};

// Helper function to find the minimum value in a BST subtree
// (the leftmost node is always the smallest)
const leftMost = (node) => {
  // Keep moving to the left child until it doesn't exist
  while (node.left) {
    node = node.left;
  }
  return node; // smallest node in that subtree
};
