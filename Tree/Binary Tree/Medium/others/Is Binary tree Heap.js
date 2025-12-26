// https://www.geeksforgeeks.org/check-if-a-given-binary-tree-is-heap/

/*

Brute

O(n) & O(n)

*/

class Solution {
  countNodes(root) {
    if (root == null) {
      return 0;
    }

    return 1 + this.countNodes(root.left) + this.countNodes(root.right);
  }

  _isComplete(node, index, count) {
    if (node === null) {
      return true;
    }

    if (index >= count) {
      return false;
    }

    return (
      this._isComplete(node.left, 2 * index + 1, count) &&
      this._isComplete(node.right, 2 * index + 2, count)
    );
  }

  _isHeap(root) {
    // code here
    if (root.left == null && root.right == null) {
      return true;
    }

    if (root.right == null) {
      return root.data >= root.left.data;
    }

    if (root.data >= root.left.data && root.data >= root.right.data) {
      return this.isHeap(root.left) && this.isHeap(root.right);
    }

    return false;
  }

  isHeap(root) {
    if (root === null) {
      return true;
    }

    return (
      // check if the tree is a complete tree separately and check if it's heap separately
      this._isComplete(root, 0, this.countNodes(root)) && this._isHeap(root)
    );
  }
}

/*

Recursion - better

O(n) & O(n)

*/

class Solution {
  countNodes(root) {
    if (root == null) {
      return 0;
    }

    return 1 + this.countNodes(root.left) + this.countNodes(root.right);
  }

  _isHeap(root, index, totalNodes) {
    if (root === null) return true;

    // Check completeness
    if (index >= totalNodes) return false;

    // Check heap property
    if (
      (root.left && root.left.data > root.data) ||
      (root.right && root.right.data > root.data)
    ) {
      return false;
    }

    // Recur for left and right
    return (
      this._isHeap(root.left, 2 * index + 1, totalNodes) &&
      this._isHeap(root.right, 2 * index + 2, totalNodes)
    );
  }

  isHeap(root) {
    if (root === null) {
      return true;
    }

    this._isHeap(root, 0, this.countNodes(root)); // check if it's complete tree inside this function itself
  }
}


/*

Iterative

O(n) & O(n)

*/

class Solution {
  isHeap(root) {
    // max heap
    // code here
    if (root == null) {
      return true;
    }

    let q = [root];
    let end = false;

    while (q.length > 0) {
      const curr = q.shift();

      if (curr.left) {
        if (end || curr.data < curr.left.data) {
          return false;
        }
        q.push(curr.left);
      } else {
        end = true; // to mark the end of the tree
      }

      if (curr.right) {
        if (end || curr.data < curr.right.data) {
          return false;
        }
        q.push(curr.right);
      } else {
        end = true;
      }
    }
    return true;
  }
}

