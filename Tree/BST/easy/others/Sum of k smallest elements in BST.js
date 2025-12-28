// https://www.geeksforgeeks.org/sum-k-smallest-elements-bst/

/*

Recursion

O(n) & O(n)

*/

function sumKSmallest(root, k) {
  let sum = 0; // stores the answer
  let count = k; // how many nodes still need to be added

  const inorder = (node) => {
    // Stop if node is null or we already picked k elements
    if (!node || count === 0) return;

    // 1️⃣ Traverse left subtree (smaller values)
    inorder(node.left);

    // Stop again after returning from left
    if (count === 0) return;

    // 2️⃣ Process current node
    sum += node.data;
    count--;

    // 3️⃣ Traverse right subtree (larger values)
    inorder(node.right);
  };

  inorder(root);
  return sum;
}

/*

Iterative - Morris inorder traversal

O(n) & O(1)

*/

function sum(root, k) {
  let current = root;
  let count = 0;
  let result = 0;

  while (current !== null) {
    if (current.left === null) {
      // Visit this node
      count++;
      result += current.data;
      if (count === k) {
        // we kept adding the nodes and returning when the count reaches k
        return result;
      }

      // Move to the right subtree
      current = current.right;
    } else {
      // Find the predecessor (rightmost node in left subtree)
      let pre = current.left;
      while (pre.right !== null && pre.right !== current) {
        pre = pre.right;
      }

      if (pre.right === null) {
        // Establish thread/link from predecessor to current
        pre.right = current;

        // Move to the left subtree
        current = current.left;
      } else {
        // Revert the thread/link from predecessor to current
        pre.right = null;

        // Visit this node
        count++;
        result += current.data;
        if (count === k) {
          return result;
        }

        // Move to the right subtree
        current = current.right;
      }
    }
  }
}
