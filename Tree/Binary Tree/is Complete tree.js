// https://www.geeksforgeeks.org/check-if-a-given-binary-tree-is-complete-tree-or-not/

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
  isComplete(root) {
    // your code here
    return this._isComplete(root, 0, this.countNodes(root));
  }
}
