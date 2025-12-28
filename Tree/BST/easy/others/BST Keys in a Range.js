// https://www.geeksforgeeks.org/print-bst-keys-in-the-given-range/

/*

Recursion

O(n) & O(h)

*/

class Solution {
  //Function to return a list of BST elements in a given range.

  inOrder(node, l, h, res) {
    if (node == null) {
      return;
    }
    if (l < node.data) this.inOrder(node.left, l, h, res);
    if (node.data >= l && node.data <= h) {
      res.push(node.data);
    }
    if (h > node.data) this.inOrder(node.right, l, h, res);
  }
  printNearNodes(root, low, high) {
    //your code here
    let res = [];
    this.inOrder(root, low, high, res);

    return res;
  }
}

/*

Iterative - Morris inorder traversal

O(n) & O(1)

*/

class Solution {
  //Function to return a list of BST elements in a given range.

  printNearNodes(root, l, r) {
    //your code here
    let res = [];
    let curr = root;

    while (curr) {
      if (curr.left == null) {
        if (curr.data >= l && curr.data <= r) {
          res.push(curr.data);
        }

        curr = curr.right;
      } else {
        let pred = curr.left;

        while (pred.right && pred.right != curr) {
          pred = pred.right;
        }

        if (pred.right == null) {
          pred.right = curr;
          curr = curr.left;
        } else {
          pred.right = null;
          if (curr.data >= l && curr.data <= r) {
            res.push(curr.data);
          }
          curr = curr.right;
        }
      }
    }

    return res;
  }
}
