// https://www.geeksforgeeks.org/dsa/print-path-root-given-node-binary-tree/
// https://www.geeksforgeeks.org/problems/root-to-leaf-paths/1

/*

Recursion - Preorder

O(n) & O(h)

*/

class Solution {
  // FunctioProot n to find the path from the
  // root to a given node with value 'x'
  getPath(root, arr, x) {
    // Base case: If the current
    // node is null, return false
    if (!root) {
      return false;
    }

    // Add the current node's
    // value to the path array
    arr.push(root.val);

    // If the current node's value is equal
    // to the target value 'x', return true
    if (root.val === x) {
      return true;
    }

    // Recursively search for the target value
    // 'x' in the left and right subtrees
    if (this.getPath(root.left, arr, x) || this.getPath(root.right, arr, x)) {
      return true;
    }

    // If the target value 'x' is not found
    // in the current path, backtrack
    arr.pop();
    return false;
  }

  // Function to find and return the path from
  // the root to a given node with value 'B'
  solve(A, B) {
    // Initialize an empty
    // array to store the path
    const arr = [];

    // If the root node is null,
    // return the empty path array
    if (A === null) {
      return arr;
    }

    // Call the getPath function to find
    // the path to the node with value 'B'
    this.getPath(A, arr, B);

    // Return the path array
    return arr;
  }
}

/*

Iterative - Pre order

O(n) & O(h)

*/

function pathFromRootToNode(root, target) {
  if (!root) return [];

  // Stack: each entry is [node, pathArray]
  const stack = [[root, [root.val]]];

  while (stack.length > 0) {
    const [node, path] = stack.pop();

    // If we found the target, return the path
    if (node.val === target) {
      return path;
    }

    // Push right child first so left is processed first
    if (node.right) {
      stack.push([node.right, [...path, node.right.val]]);
    }
    if (node.left) {
      stack.push([node.left, [...path, node.left.val]]);
    }
  }

  return [];
}

// Root to leaf paths



class Solution {
  isLeaf(node) {
    return node.left == null && node.right == null;
  }
  Paths(root) {
    // code here

    const res = [];

    const traversal = (node, path) => {
      if (node == null) return;

      path.push(node.data);
      if (this.isLeaf(node)) {
        res.push([...path]);
      } else {
        traversal(node.left, path);
        traversal(node.right, path);
      }
      path.pop();
    };

    traversal(root, []);
    return res;
  }
}

class Solution {

  Paths(root) {
    // code here
    const result = [];
    if (!root) return result;

    // Stack to store pairs of nodes and the
    // path from the root to that node
    const stk = [[root, [root.data]]];

    while (stk.length > 0) {
      // Get the current node and its
      // associated path from the stack
      const [currNode, path] = stk.pop();

      // If the current node is a leaf node,
      // add its path to the result
      if (!currNode.left && !currNode.right) {
        result.push(path);
      }

      // If the current node has a right child,
      // push it to the stack with its path
      if (currNode.right) {
        const rightPath = [...path, currNode.right.data];
        stk.push([currNode.right, rightPath]);
      }

      // If the current node has a left child,
      // push it to the stack with its path
      if (currNode.left) {
        const leftPath = [...path, currNode.left.data];
        stk.push([currNode.left, leftPath]);
      }
    }

    return result;
  }
}
