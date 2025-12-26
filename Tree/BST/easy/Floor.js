// https://www.geeksforgeeks.org/floor-in-binary-search-tree-bst/

function floor(root, x) {
  //code here
  if (root === null) {
    return -1;
  }

  if (root.data === x) {
    return root.data;
  }

  if (root.data > x) {
    return floor(root.left, x);
  }

  const res = floor(root.right, x);
  /*
    If root.data < x, then root.data is a possible floor.

    But there might be a larger number that's still ≤ x in the right subtree — and we want the greatest one.
    */
  return res <= x && res != -1 ? res : root.data;
}

function floor(root, x) {
  //code here
  let res = -1;
  let curr = root;

  while (curr) {
    if (curr.data < x) {
      res = curr.data;
      curr = curr.right;
    } else if (curr.data > x) {
      curr = curr.left;
    } else {
      res = curr.data;
      return res;
    }
  }

  return res;
}
