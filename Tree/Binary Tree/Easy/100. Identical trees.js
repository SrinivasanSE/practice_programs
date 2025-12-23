// https://www.geeksforgeeks.org/write-c-code-to-determine-if-two-trees-are-identical/
// https://www.geeksforgeeks.org/check-if-two-trees-are-mirror/
// https://leetcode.com/problems/same-tree/description/

/*

Recursion

O(n) & O(n)

*/

class Solution {
  // Function to check if two trees are identical.
  isIdentical(r1, r2) {
    // your code here

    if (r1 === null || r2 === null) {
      return r1 == r2;
    }

    return (
      r1.data === r2.data &&
      this.isIdentical(r1.left, r2.left) &&
      this.isIdentical(r1.right, r2.right)
    );
  }
}

/*

Iterative

O(n) & O(n)

*/

class Solution {
  // Function to check if two trees are identical.
  isIdentical(r1, r2) {
    // your code here
    if (r1 === null && r2 === null) {
      return true;
    }

    if (r1 === null || r2 === null) {
      return false;
    }

    let q1 = [r1];
    let q2 = [r2];

    while (q1.length > 0 && q2.length > 0) {
      const c1 = q1.shift();
      const c2 = q2.shift();

      if (c1.data != c2.data) {
        return false;
      }

      if (c1.left && c2.left) {
        q1.push(c1.left);
        q2.push(c2.left);
      } else if (c1.left || c2.left) {
        // if there is a left node in any of the two, that means it's not identical
        return false;
      }

      if (c1.right && c2.right) {
        q1.push(c1.right);
        q2.push(c2.right);
      } else if (c1.right || c2.right) {
        return false;
      }
    }

    return q1.length == 0 && q2.length == 0; // or can just return true
  }
}

/*

Iterative - Morris traversal

O(n) & O(1)

*/

var isSameTree = function (p, q) {
  // If both trees are empty, they are identical
  if (p == null && q == null) return true;

  // If only one is empty, structures differ
  if (p == null || q == null) return false;

  // curr1 and curr2 traverse tree p and q respectively
  let curr1 = p,
    curr2 = q;
  let pred; // used to find inorder predecessor (Morris traversal)

  // Traverse both trees simultaneously
  while (curr1 && curr2) {
    // Values must match at every corresponding node
    if (curr1.val !== curr2.val) return false;

    /* ---------- Morris traversal for tree p ---------- */
    if (curr1.left == null) {
      // No left child → move to right child
      curr1 = curr1.right;
    } else {
      // Find inorder predecessor (rightmost node in left subtree)
      pred = curr1.left;
      while (pred.right && pred.right !== curr1) {
        pred = pred.right;
      }

      if (pred.right == null) {
        // First time visiting curr1:
        // create a temporary thread to come back later
        pred.right = curr1;
        curr1 = curr1.left;
      } else {
        // Second time visiting curr1:
        // remove thread and move to right subtree
        pred.right = null;
        curr1 = curr1.right;
      }
    }

    /* ---------- Morris traversal for tree q ---------- */
    if (curr2.left == null) {
      curr2 = curr2.right;
    } else {
      pred = curr2.left;
      while (pred.right && pred.right !== curr2) {
        pred = pred.right;
      }

      if (pred.right == null) {
        pred.right = curr2;
        curr2 = curr2.left;
      } else {
        pred.right = null;
        curr2 = curr2.right;
      }
    }
  }

  // Both trees must finish traversal at the same time
  return curr1 == null && curr2 == null;
};
