// https://www.geeksforgeeks.org/convert-bst-to-max-heap/

class Solution {
  // 🔹 Inorder traversal of BST
  // Left → Root → Right
  // For a BST, this always produces a SORTED array (ascending order)
  inOrder(root, arr) {
    // Base case: if node is null, stop
    if (root == null) {
      return;
    }

    // 1️⃣ Traverse left subtree
    this.inOrder(root.left, arr);

    // 2️⃣ Visit current node
    // Push current node's value into array
    arr.push(root.data);

    // 3️⃣ Traverse right subtree
    this.inOrder(root.right, arr);
  }

  // 🔹 Postorder traversal
  // Left → Right → Root
  // Used here to assign values back so that parent nodes
  // get larger values than their children (Max Heap property)
  postOrder(root, arr, index) {
    // Base case
    if (root == null) {
      return;
    }

    // 1️⃣ Process left subtree first
    this.postOrder(root.left, arr, index);

    // 2️⃣ Process right subtree next
    this.postOrder(root.right, arr, index);

    // 3️⃣ Assign value to current node
    // Since postorder visits children before parent,
    // smaller values go to children and larger values go up
    root.data = arr[index[0]];

    // Move to next value in sorted array
    index[0]++;
  }

  // 🔹 Main function to convert BST to Max Heap
  convertToMaxHeapUtil(root) {
    // Step 1: Store BST values in sorted order
    let arr = [];
    this.inOrder(root, arr);

    // Step 2: Use postorder traversal to assign values
    // index is wrapped in array so it can be updated across recursive calls
    let index = [0];
    this.postOrder(root, arr, index);

    // Return the root of the modified tree (now a Max Heap)
    return root;
  }
}

/*

O(n) & O(n)

*/

// ----------------------------------------------------
// Main function: Convert BST to Max Heap
// ----------------------------------------------------
// Note: This method DOES NOT preserve the original BST structure.
// It rebuilds the tree as a heap.
function convertToMaxHeap(root) {
  // Step 1: Store all nodes in level-order array
  let q = collectNodes(root);

  // Step 2: Rearrange array to satisfy Max Heap property
  buildMaxHeap(q);

  // Step 3: Reconnect nodes based on heap indices
  reconnectTree(q);

  // Root of heap is the first element in array
  return q[0];
}

// ----------------------------------------------------
// Step 1: Collect all nodes in LEVEL ORDER (BFS)
// ----------------------------------------------------
// This flattens the tree into an array-like representation
// similar to how heaps are stored in arrays.
function collectNodes(root) {
  let q = []; // will store all tree nodes in level order

  // Edge case: empty tree
  if (root === null) return q;

  let temp = [root]; // temporary queue for BFS traversal

  while (temp.length > 0) {
    // Remove the front node from queue
    let node = temp.shift();

    // Store the node reference in array
    q.push(node);

    // Push left child to BFS queue if it exists
    if (node.left) temp.push(node.left);

    // Push right child to BFS queue if it exists
    if (node.right) temp.push(node.right);
  }

  // q now contains nodes in level-order sequence
  return q;
}

// ----------------------------------------------------
// Step 2: Convert the array of nodes into a MAX HEAP
// ----------------------------------------------------
// This uses the standard heap construction method
// starting from the last non-leaf node and heapifying down.
function buildMaxHeap(q) {
  let n = q.length;

  // Index of last non-leaf node = floor((n - 2) / 2)
  for (let i = Math.floor((n - 2) / 2); i >= 0; i--) {
    // Ensure subtree rooted at index i satisfies max heap property
    heapifyDown(q, n, i);
  }

  /*
    Alternative approach (commented):
    Build heap using heapify-up method.
    This is less efficient (O(n log n)) compared to heapify-down.

    for (let i = 1; i < q.length; i++) {
        heapify_up(q, i);
    }
  */
}

// ----------------------------------------------------
// Step 3: Reconnect nodes to form a tree from heap array
// ----------------------------------------------------
// Converts array-based heap representation back into a tree
// using index-based child relationships.
function reconnectTree(q) {
  let n = q.length;

  for (let i = 0; i < n; i++) {
    // Left child index = 2*i + 1
    q[i].left = 2 * i + 1 < n ? q[2 * i + 1] : null;

    // Right child index = 2*i + 2
    q[i].right = 2 * i + 2 < n ? q[2 * i + 2] : null;
  }
}
