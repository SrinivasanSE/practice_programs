// https://www.geeksforgeeks.org/dsa/deletion-binary-tree/

// O(n) & O(n)

/*

The idea is to traverse the tree in level order manner. To perform the Deletion in a Binary Tree follow below:   

Starting at the root, find the deepest and rightmost node in the binary tree and the node which we want to delete. 
Replace the deepest rightmost node’s data with the node to be deleted. 
Then delete the deepest rightmost node.

*/

// Function to delete the node with the given key
function deletion(root, key) {
  if (root === null) return null;

  // If the tree has only one node
  if (root.left === null && root.right === null) {
    if (root.data === key) return null;
    else return root;
  }

  let queue = [];
  queue.push(root);

  let keyNode = null;
  let curr = null;

  // Level order traversal to find the
  // deepest node and the key node
  while (queue.length !== 0) {
    curr = queue.shift();

    // If current node is the key node
    if (curr.data === key) keyNode = curr;

    if (curr.left) queue.push(curr.left);
    if (curr.right) queue.push(curr.right);
  }

  // If the key node is found, replace its data
  // with the deepest node's data
  if (keyNode !== null) {
    // Store the deepest node's data
    let x = curr.data;

    // Replace the key node's data with the
    // deepest node's data
    keyNode.data = x;

    // Delete the deepest node
    deleteDeepest(root, curr);
  }

  return root;
}

// Function to delete the deepest node in
// a binary tree
function deleteDeepest(root, dNode) {
  // this function is called above
  let queue = [];
  queue.push(root);

  while (queue.length !== 0) {
    let curr = queue.shift();

    // If current node is the deepest
    // node, delete it
    if (curr === dNode) {
      curr = null;
      return;
    }

    // Check the right child first
    if (curr.right) {
      if (curr.right === dNode) {
        curr.right = null;
        return;
      } else {
        queue.push(curr.right);
      }
    }

    // Check the left child
    if (curr.left) {
      if (curr.left === dNode) {
        curr.left = null;
        return;
      } else {
        queue.push(curr.left);
      }
    }
  }
}
