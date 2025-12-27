// https://leetcode.com/problems/recover-binary-search-tree/description/

/*

Brute

O(nlogn) & O(n)


*/

// Find the inorder for the given tree and sort it so that we get the correct inorder and traverse again and replace it if the values are not same, that means they are not in the right order
var recoverTree = function (root) {
  const nodes = [];
  const dfs = (root) => {
    if (root == null) return;

    dfs(root.left);
    nodes.push(root.val);
    dfs(root.right);
  };

  dfs(root);
  nodes.sort((a, b) => a - b);
  let i = 0;
  var inorderTraversal = function (root) {
    // left - root - right
    let curr = root,
      prev;

    while (curr) {
      if (curr.left == null) {
        if (curr.val != nodes[i]) {
          // check and replace
          curr.val = nodes[i];
        }
        i++;
        curr = curr.right;
      } else {
        prev = curr.left;

        while (prev.right && prev.right != curr) {
          prev = prev.right;
        }

        if (prev.right == null) {
          prev.right = curr;
          curr = curr.left;
        } else {
          prev.right = null;
          if (curr.val != nodes[i]) {
            // check and replace
            curr.val = nodes[i];
          }
          i++;
          curr = curr.right;
        }
      }
    }
  };

  inorderTraversal(root);
  return root;
};

/*

Better

O(n) & O(n)

*/

/*

The inorder is in sorted order, if the nodes are swapped, large node will be at the beginning and small node would be at the last as it's swapped
[1,2,3,4,5] -> [1,4,3,2,5] 

first points to the first large value out of order.
second points to the last small value out of order.

first = 4, second = 2

If the nodes are adjacent, [1,3,2] first = 3, second = 2
If the nodes are not adjacent, [1,4,3,2,5] first = 4, second = 3 (later gets updated to 2) as we found another misplaced node

*/

var recoverTree = function (root) {
  let first,
    second,
    prev = new TreeNode(Number.MIN_SAFE_INTEGER);
  const inOrder = (root) => {
    if (root == null) return null;

    inOrder(root.left);
    if (root.val < prev.val) {
      // if the previous node's val is greater, that means the order is not correct [1, 3, 2] 3 > 2
      if (first == null) {
        first = prev;
        second = root;
      } else {
        second = root; // root is assigned here
      }
    }

    prev = root;
    inOrder(root.right);
  };

  inOrder(root);

  if (first != null && second != null) {
    // after finding the first and second wrong node, swap the values
    [first.val, second.val] = [second.val, first.val];
  }

  return root;
};

/*

Optimal - Morris traversal

O(n) & O(1)

*/

var recoverTree = function (root) {
  let first,
    second,
    prev = new TreeNode(Number.MIN_SAFE_INTEGER);
  const inOrder = (root) => {
    let curr = root;
    let temp;
    while (curr) {
      if (curr.left == null) {
        if (curr.val < prev.val) {
          // if the previous node's val is greater, that means the order is not correct [1, 3, 2] 3 > 2
          if (first == null) {
            first = prev;
            second = curr;
          } else {
            second = curr;
          }
        }
        prev = curr;
        curr = curr.right;
      } else {
        temp = curr.left;
        while (temp.right && temp.right != curr) {
          temp = temp.right;
        }

        if (temp.right == null) {
          temp.right = curr;
          curr = curr.left;
        } else {
          temp.right = null;
          if (curr.val < prev.val) {
            if (first == null) {
              first = prev;
              second = curr;
            } else {
              second = curr;
            }
          }
          prev = curr;
          curr = curr.right;
        }
      }
    }
  };

  inOrder(root);
  if (first != null && second != null) {
    [first.val, second.val] = [second.val, first.val];
  }

  return root;
};
