// https://www.geeksforgeeks.org/find-the-minimum-element-in-a-binary-search-tree/


/*

Brute - Inorder traversal of BST returns nodes in sorted order, first element will be the min and last element will be the max

O(n) & O(n)

*/


// Performs inorder traversal of BST
// and stores values in sorted order
function inorder(root, sortedInorder) {
    if (root === null) return;

    // Traverse left subtree
    inorder(root.left, sortedInorder);

    sortedInorder.push(root.data);

    // Traverse right subtree
    inorder(root.right, sortedInorder);
}

// Returns the minimum value in a BST
function minValue(root) {
    if (root === null) return -1;

    const sortedInorder = [];

    // Get all BST values in sorted order
    inorder(root, sortedInorder);

    return sortedInorder[0];
}

/*

Better - Recursion

O(h) & O(h)

*/

class Solution {
  // Function to find the minimum element in the given BST.
  minValue(root) {
    // your code here
    if (root.left == null) {
      return root.data;
    }

    return this.minValue(root.left);
  }
}

/*

Optimal - Iterative

O(h) & O(1)

*/


class Solution {
  // Function to find the minimum element in the given BST.
  minValue(root) {
    // your code here
    if (root == null) {
      return -1;
    }

    let curr = root;
    while (curr.left != null) {
      curr = curr.left;
    }

    return curr.data;
  }
}

// Similar logic applies for finding max


class Solution {
  // Function to find the minimum element in the given BST.
  maxValue(root) {
    // your code here
    if (root == null) {
      return -1;
    }

    let curr = root;
    while (curr.right != null) {
      curr = curr.right;
    }

    return curr.data;
  }
}
