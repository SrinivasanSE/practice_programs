// https://www.geeksforgeeks.org/sorted-array-to-balanced-bst/

/*

Recursion

O(n) & O(n)

*/

/*

The idea is to use recursion to build the tree from a sorted array. We first find the middle element of the array and make it the root of the tree.
Then we recursively repeat the same process for the left subarray (to form the left subtree) and the right subarray (to form the right subtree). 

*/

class Solution {
  BST(nums, l, h) {
    if (l > h) return null;
    const mid = l + Math.floor((h - l) / 2);
    let root = new Node(nums[mid]);
    root.left = this.BST(nums, l, mid - 1);
    root.right = this.BST(nums, mid + 1, h);

    return root;
  }
  sortedArrayToBST(nums) {
    // code here

    const n = nums.length;
    const root = this.BST(nums, 0, n - 1);
    return root;
  }
}


/*

Iterative - Queue

O(n) & O(n)

*/

class Solution {
  sortedArrayToBST(nums) {
    // nums is a sorted array
    // Goal: convert it into a height-balanced BST

    const n = nums.length;

    // Base case: empty array → no tree
    if (n === 0) {
      return null;
    }

    // Choose the middle element of the full array as the root
    // Using (n - 1) / 2 ensures left-biased mid for even lengths
    let mid = Math.floor((n - 1) / 2);
    const root = new Node(nums[mid]);

    // Queue for BFS-style construction
    // Each item stores:
    //  - the tree node created
    //  - the range [start, end] in nums it represents
    let q = [{ node: root, range: [0, n - 1] }];

    // Pointer instead of shift() to keep O(1) operations
    let front = 0;

    // Process all nodes level by level
    while (front < q.length) {
      const item = q[front];
      const curr = item.node; // current tree node
      const [s, e] = item.range; // subarray range for this node

      // Recompute mid for the current subarray range [s, e]
      mid = s + Math.floor((e - s) / 2);

      // -------- LEFT SUBTREE --------
      // If there are elements on the left side of mid
      if (s < mid) {
        // Left subtree uses range [s, mid - 1]
        // Pick middle of this left range to keep tree balanced
        const midLeft = s + Math.floor((mid - 1 - s) / 2);

        // Create left child
        curr.left = new Node(nums[midLeft]);

        // Push left child with its corresponding range into the queue
        q.push({ node: curr.left, range: [s, mid - 1] });
      }

      // -------- RIGHT SUBTREE --------
      // If there are elements on the right side of mid
      if (e > mid) {
        // Right subtree uses range [mid + 1, e]
        // Pick middle of this right range
        const midRight = mid + 1 + Math.floor((e - mid - 1) / 2);

        // Create right child
        curr.right = new Node(nums[midRight]);

        // Push right child with its corresponding range into the queue
        q.push({ node: curr.right, range: [mid + 1, e] });
      }

      // Move to the next item in the queue
      front++;
    }

    // Root of the balanced BST
    return root;
  }
}
