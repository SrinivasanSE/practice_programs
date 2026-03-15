// https://leetcode.com/problems/symmetric-tree/description/

/*

Recursion

O(n) & O(h)

*/

var isSymmetric = function (root) {
  if (root == null) return true;

  const isMirror = (p, q) => {
    if (p == null && q == null) return true;

    if (p == null || q == null) return false;

    return (
      p.val === q.val &&
      isMirror(p.left, q.right) &&
      isMirror(p.right, q.left)
    ); // check left and right node
  };

  return isMirror(root.left, root.right); // we are passing left and right
};

/*

Iterative

O(n) & O(n)

*/

var isSymmetric = function (root) {
  let queue = [root.left, root.right];

  while (queue.length) {
    let left = queue.shift();
    let right = queue.shift();

    if (!left && !right) continue;
    if (!left || !right || left.val !== right.val) return false;

    queue.push(left.left, right.right);
    queue.push(left.right, right.left);
  }

  return true;
};
