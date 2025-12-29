// https://www.geeksforgeeks.org/dsa/insertion-in-a-binary-tree-in-level-order/

function InsertNode(root, data) {
  // If the tree is empty, assign new
  // node address to root
  if (root == null) {
    root = new Node(data);
    return root;
  }

  // Else, do level order traversal until we find an empty
  // place, i.e. either left child or right child of some
  // node is pointing to NULL.
  let q = [];
  q.push(root);

  while (q.length > 0) {
    let curr = q.shift();

    // First check left if left is null
    // insert node in left otherwise check for right
    if (curr.left !== null) q.push(curr.left);
    else {
      curr.left = new Node(data);
      return root;
    }

    if (curr.right !== null) q.push(curr.right);
    else {
      curr.right = new Node(data);
      return root;
    }
  }
}
