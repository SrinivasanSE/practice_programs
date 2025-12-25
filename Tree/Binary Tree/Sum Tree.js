// https://www.geeksforgeeks.org/check-if-a-given-binary-tree-is-sumtree/

// A Sum Tree is a Binary Tree where the value of a node is equal to the sum of the nodes present in its left subtree and right subtree.
// This is diff from children sum, here for the root node, instead of immediate left and right node, we need to sum all the nodes in the left tree and right tree and check if it's equal

/*

Brute - By Checking Every Node

O(n^2) & O(h)

*/

class Solution {
  // Should return true if tree is Sum Tree, else false
  sum(node) {
    if (node == null) {
      return 0;
    }

    return this.sum(node.left) + node.key + this.sum(node.right);
  }
  isSumTree(root) {
    // code here
    if (root == null || (root.left == null && root.right == null)) {
      return true;
    }

    let ls = this.sum(root.left);
    let rs = this.sum(root.right);

    return (
      root.key == ls + rs &&
      this.isSumTree(root.left) &&
      this.isSumTree(root.right)
    );
  }
}

/*

Optimal

O(n) & O(h)

*/


/*

At node 10, 4 and 6 are leaf nodes, so isSumTree will be true, we find ls val = 4 and rs val = 6 and it's eq to 10, so we return true. Similar for node 3 as well
At node 26, we know both left and right subtree are sum tree, so we can directly find the ls sum as 2*10 = 20 and 2*3 = 6 instead of recalc the sum

        26
       /  \
     10    3
    /  \    \
   4    6    3


*/

class Solution {
  // A helper function to check if a node is a leaf
  isLeaf(node) {
    // A null node or a node with no children is considered a leaf
    if (node === null || (node.left === null && node.right === null)) {
      return true;
    }
    return false;
  }

  // Main function to check Sum Tree
  isSumTree(root) {
    let ls, rs; // left sum and right sum

    // Base case:
    // Empty tree or leaf node is always a Sum Tree
    if (root == null || this.isLeaf(root)) {
      return true;
    }

    // Recursively check if left and right subtrees are Sum Trees
    if (this.isSumTree(root.left) && this.isSumTree(root.right)) {
      // Compute left subtree sum
      if (root.left == null) ls = 0;
      else if (this.isLeaf(root.left)) ls = root.left.key;
      else ls = 2 * root.left.key; // Since we already know left tree is a sum tree, it's node val should be eq to ls + rs, so we can directly take it as 2*x and no need to recompute the sum again

      // Compute right subtree sum
      if (root.right == null) rs = 0;
      else if (this.isLeaf(root.right)) rs = root.right.key;
      else rs = 2 * root.right.key;

      // Check Sum Tree property for current node
      return root.key == ls + rs;
    }

    // If either subtree is not a Sum Tree
    return false;
  }
}


/*

Optimal - Post order traversal

O(n)& O(h)

*/


class Solution {

  // Helper function:
  // Returns:
  //   - subtree sum if the tree rooted at 'root' is a Sum Tree
  //   - -1 if it is NOT a Sum Tree
  _isSumTree(root) {

    // Case 1: Empty tree
    // Sum of empty tree = 0
    if (root == null) {
      return 0;
    }

    // Case 2: Leaf node
    // Leaf is always a Sum Tree
    // Sum of subtree = node's value
    if (root.left == null && root.right == null)
      return root.key;

    // Recursively check left subtree
    let ls = this._isSumTree(root.left);

    // If left subtree is not a Sum Tree, propagate failure
    if (ls === -1) {
      return -1;
    }

    // Recursively check right subtree
    let rs = this._isSumTree(root.right);

    // If right subtree is not a Sum Tree, propagate failure
    if (rs === -1) {
      return -1;
    }

    // Check Sum Tree condition for current node
    if (root.key == ls + rs)
      // Valid Sum Tree:
      // Return total subtree sum
      return ls + rs + root.key;
    else
      // Violates Sum Tree condition
      return -1;
  }

  // Wrapper function
  isSumTree(root) {
    // Tree is Sum Tree if helper does NOT return -1
    const res = this._isSumTree(root);
    return res != -1;
  }
}

