// https://www.geeksforgeeks.org/check-if-a-given-binary-tree-is-complete-tree-or-not/


/*

A binary tree is complete if:

All levels except possibly the last are completely filled

All nodes in the last level are as far left as possible

*/

/*

Iterative

O(n) & O(n)

*/

class Solution {
  isComplete(root) {
    // your code here

    if (root == null) {
      return true;
    }

    let q = [root];
    let isNullNode = false;
    while (q.length > 0) {
      let curr = q.shift();

      if (curr == null) {
        isNullNode = true;
      } else {
        if (isNullNode) {
          return false;
        }

        q.push(curr.left);
        q.push(curr.right);
      }
    }

    return true;
  }
}

/*

Recursion

O(n) & O(n)

*/

/*

In a complete binary tree, no node can have an index ≥ total number of nodes

*/

class Solution {

  // Step 1: Count total nodes in the tree
  countNodes(root) {
    if (root == null) {
      return 0;
    }

    // Count this node + left subtree + right subtree
    return 1 + this.countNodes(root.left) + this.countNodes(root.right);
  }

  // Step 2: Check completeness using index mapping
  _isComplete(node, index, count) {

    // Null nodes are valid in a complete tree
    if (node === null) {
      return true;
    }

    // If any node gets an index >= total nodes,
    // the tree is NOT complete
    if (index >= count) {
      return false;
    }

    // Recursively check left and right subtrees
    return (
      this._isComplete(node.left, 2 * index + 1, count) &&
      this._isComplete(node.right, 2 * index + 2, count)
    );
  }

  // Main function
  isComplete(root) {
    // Count nodes first, then check completeness
    const count = this.countNodes(root)
    return this._isComplete(root, 0, count);
  }
}

