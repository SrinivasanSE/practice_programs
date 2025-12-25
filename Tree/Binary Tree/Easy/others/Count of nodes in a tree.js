// https://www.geeksforgeeks.org/write-a-c-program-to-calculate-size-of-a-tree/

/*

Recursion

O(n) & O(n)

*/

class Solution {
  getSize(node) {
    // code here
    if (node == null) {
      return 0;
    }

    const left = this.getSize(node.left);
    const right = this.getSize(node.right);

    return left + right + 1;
  }
}


/*

Iterative - Morris traversal

*/

class Solution {
  getSize(node) {
    let count = 0;
    let curr = node;

    while (curr) {
      if (curr.left == null) {
        count++;
        curr = curr.right;
      } else {
        // Find the inorder predecessor of curr
        let prev = curr.left;
        while (prev.right && prev.right !== curr) {
          prev = prev.right;
        }

        if (prev.right == null) {
          // Make a temporary link to curr
          prev.right = curr;
          curr = curr.left;
        } else {
          // Remove the temporary link
          prev.right = null;
          count++;
          curr = curr.right;
        }
      }
    }

    return count;
  }
}
