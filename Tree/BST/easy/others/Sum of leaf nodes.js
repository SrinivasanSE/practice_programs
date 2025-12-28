// https://www.geeksforgeeks.org/problems/sum-of-leaf-nodes/1

/*

Recursion

O(n) & O(n)

*/

function sumOfLeafNodes(root) {
  //your code here
  if (root === null) {
    return 0;
  }

  if (root.left === null && root.right === null) {
    return root.data;
  }

  return this.sumOfLeafNodes(root.left) + this.sumOfLeafNodes(root.right);
}

/*

Iterative - inorder traversal

O(n) & O(1)

*/

class Solution {
  leafSum(root) {
    // code here
    if (root == null) return 0;

    const stk = [];
    let node = root;
    let sum = 0;

    while (true) {
      if (node != null) {
        // Keep moving left, pushing nodes to stack
        stk.push(node);
        node = node.left;
      } else {
        // If stack is empty, traversal is complete
        if (stk.length === 0) {
          break;
        }

        // Visit the node
        node = stk.pop();

        // ✅ Add only leaf nodes
        if (node.left == null && node.right == null) {
          sum += node.data; // or node.val depending on TreeNode
        }

        // Move to right subtree
        node = node.right;
      }
    }

    return sum;
  }
}
