// https://www.geeksforgeeks.org/kth-largest-element-in-bst-when-modification-to-bst-is-not-allowed/

/*

Recursion - will traverse the BST in
reverse in-order manner

O(n) & O(n)

*/

class Solution {
  kthLargest(root, k) {
    // code here
    let count = 0;
    let res = 0;
    const inorder = (node) => {
      // right -> root -> left (reverse inorder)
      if (node == null || count >= k) {
        return;
      }

      inorder(node.right); // go to right first instead of left
      count++;
      if (count === k) {
        res = node.data;
        return;
      }
      inorder(node.left);
    };

    inorder(root);

    return res;
  }
}

/*

Better - Iterative reverse inorder traversal

O(n) & O(n)

*/

class Solution {
  // return the Kth largest element in the given BST rooted at 'root'
  kthLargest(root, k) {
    // code here
    if (root == null) return null;
    let count = 0;
    let curr = root;
    let stk = [];

    while (true) {
      if (curr) {
        stk.push(curr);
        curr = curr.right;
      } else {
        if (stk.length == 0) {
          return;
        }
        curr = stk.pop();
        count++;
        if (count === k) {
          return curr.data;
        }
        curr = curr.left;
      }
    }
  }
}

/*

Optimal - Morris traversal

O(n) & O(1)

*/

class Solution {
  kthLargest(root, k) {
    // reverse inorder, use right instead of left
    if (root == null) {
      return;
    }

    let curr = root;
    let count = 0;
    while (curr) {
      if (curr.right === null) {
        count++;
        if (count === k) {
          return curr.data;
        }

        curr = curr.left;
      } else {
        let succ = curr.right;
        while (succ.left && succ.left != curr) {
          succ = succ.left;
        }

        if (succ.left === null) {
          succ.left = curr;
          curr = curr.right;
        } else {
          succ.left = null;
          count++;
          if (count === k) {
            return curr.data;
          }
          curr = curr.left;
        }
      }
    }
  }
}
