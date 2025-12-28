// https://www.geeksforgeeks.org/find-median-bst-time-o1-space/


/*

Recursion

O(n) & O(n)

*/


/*

The idea is based on the property of BST, i.e., inorder traversal of BST gives a sorted list. We will store the inorder traversal of the BST and return the median.

*/


class Solution {
  inOrder(root, values) {
    if (root === null) {
      return;
    }
    this.inOrder(root.left, values);
    values.push(root.data);
    this.inOrder(root.right, values);
  }
  findMedian(root) {
    //code here
    const values = [];
    this.inOrder(root, values);
    const n = values.length;
    if (n % 2 === 0) {
      return (values[n / 2 - 1] + values[n / 2]) / 2.0;
    }
    return values[Math.floor(n / 2)];
  }
}


/*

Iterative - Morris traversal

O(n) & O(1)

*/

/*

During the first traversal, we count the total number of nodes in the BST. 
Then, during the second traversal, we again perform Morris traversal while maintaining a counter for visited nodes. 
Once the counter reaches the middle position (depending on whether the number of nodes is odd or even), we return the value of the current node as the median.

*/

class Solution {
  countNodes(root) {
    if (root === null) {
      return 0;
    }
    let count = 0;
    let curr = root;
    let pred;
    while (curr) {
      if (curr.left === null) {
        count++;
        curr = curr.right;
      } else {
        pred = curr.left;
        while (pred.right && pred.right != curr) {
          pred = pred.right;
        }

        if (pred.right == null) {
          pred.right = curr;
          curr = curr.left;
        } else {
          pred.right = null;
          curr = curr.right;
          count++;
        }
      }
    }

    return count;
  }
  findMedian(root) {
    //code here
    if (root === null) {
      return 0;
    }
    let count = this.countNodes(root); 
    let currNodes = 0;
    let pred;
    let prev = null;
    let curr = root;
    while (curr) {
      if (curr.left == null) {
        currNodes++; // 1 based indexing, we increment at the start itself
        if (count % 2 != 0 && currNodes === (count + 1) / 2) { // for odd case. [1,2,3,4,5,6,7], count = 7, (7 + 1) / 2 = 4, when the currNodes = 4, we can just return the curr node
          return curr.data;
        }
        if (count % 2 === 0 && currNodes === count / 2 + 1) { // for even case. [1,4,5,7] count = 4, 4/2 + 1 = 3 when the currNodes = 3, we return (4 + 5) / 2.0
          return (prev.data + curr.data) / 2.0;
        }

        prev = curr;
        curr = curr.right;
      } else {
        pred = curr.left;
        while (pred.right && pred.right != curr) {
          pred = pred.right;
        }

        if (pred.right == null) {
          pred.right = curr;
          curr = curr.left;
        } else {
          currNodes++;

          if (count % 2 != 0 && currNodes === (count + 1) / 2) {
            return curr.data;
          }
          if (count % 2 === 0 && currNodes === count / 2 + 1) {
            return (prev.data + curr.data) / 2.0;
          }
          prev = curr;
          pred.right = null;
          curr = curr.right;
        }
      }
    }
  }
}



