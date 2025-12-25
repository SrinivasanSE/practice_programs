// https://www.geeksforgeeks.org/dsa/check-for-children-sum-property-in-a-binary-tree/

// The parent node sum should be equal to two child's nodes value.

/*

Recursion

O(n) & O(H)


*/

class Solution {
  isSumProperty(root) {
    //  leaf node satisfies child sum property
    if (root == null || (root.left == null && root.right == null)) return true;

    let sum = 0;

    if (root.left) {
      sum += root.left.data;
    }
    if (root.right) {
      sum += root.right.data;
    }

    return (
      root.data === sum &&
      this.isSumProperty(root.left) &&
      this.isSumProperty(root.right)
    );
  }
}

/*

Iterative - BFS

O(n) & O(n)

*/

class Solution {
  isSumProperty(root) {
    //  code here
    const q = [root];

    while (q.length > 0) {
      let node = q.shift();
      const left = node.left ? node.left.data : 0;
      const right = node.right ? node.right.data : 0;

      if (node.left == null && node.right == null) {
        continue;
      }
      if (node.data != left + right) {
        return false;
      }

      if (node.left) {
        q.push(node.left);
      }
      if (node.right) {
        q.push(node.right);
      }
    }

    return true;
  }
}
