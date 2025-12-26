// https://www.geeksforgeeks.org/binary-search-tree-set-1-search-and-insertion/
// https://leetcode.com/problems/search-in-a-binary-search-tree/description/

/*

Recursion

O(n) & O(h)

*/

class Solution {
  // Function to search a node in BST.
  search(root, x) {
    // your code here

    if (root === null || root.data === x) {
      return root;
    }

    if (root.data < x) {
      return this.search(root.right, x);
    }

    return this.search(root.left, x);
  }
}

/*

Iterative 

O(n) & O(1)

*/

class Solution {
  // Function to search a node in BST.
  search(root, x) {
    // your code here

    let curr = root;

    while (curr) {
      if (curr.data === x) {
        return true; // or curr node if asked to return the node
      }

      if (curr.data < x) {
        curr = curr.right;
      } else {
        curr = curr.left;
      }
    }

    return false;
  }
}
