// https://www.geeksforgeeks.org/floor-and-ceil-from-a-bst/

/*

Recursion

O(logn) & O(logn)

*/

class Solution {
  // Function to return the ceil of given number in BST.
  findCeil(root, x) {

    // Base case: if tree/subtree is empty,
    // no ceil can be found
    if (root === null) {
      return -1;
    }

    // If exact value is found,
    // it is the ceil
    if (root.data === x) {
      return root.data;
    }

    // If current node value is smaller than x,
    // ceil must lie in the right subtree
    if (root.data < x) {
      return this.findCeil(root.right, x);
    }

    // If current node value is greater than x,
    // it COULD be the ceil,
    // but there might be a smaller ceil in the left subtree
    const res = this.findCeil(root.left, x);

    // If left subtree returned a valid ceil (>= x),
    // use it; otherwise, current node is the ceil
    return res >= x ? res : root.data;
  }
}


/*

Iterative

O(logn) & O(1)

*/

class Solution {
  // Function to return the ceil of given number in BST.
  findCeil(root, x) {
    // your code here
    let res = -1;

    let curr = root;

    while (curr != null) {
      if (curr.data < x) {
        curr = curr.right;
      } else if (curr.data > x) {
        res = curr.data;
        curr = curr.left;
      } else { // if we found the value, we can return here itself
        return curr.data;
      }
    }
    return res;
  }
}
