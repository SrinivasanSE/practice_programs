// https://www.geeksforgeeks.org/construct-a-binary-search-tree-from-given-postorder/

/*

Brute

O(n^2) & O(n)

*/

class Solution {
  insert(root, val) {
    if (root === null) {
      return new Node(val);
    }

    if (root.data < val) {
      root.right = this.insert(root.right, val);
    } else if (root.data > val) {
      root.left = this.insert(root.left, val);
    }

    return root;
  }
  constructTree(post, n) {
    //code here
    let root = null;
    for (let i = post.length - 1; i >= 0; i--) {
      root = this.insert(root, post[i]);
    }

    return root;
  }
}

/*

Better

O(nlogn) & O(n)

*/

class Solution { // Same as constructing binary tree from inorder and postorder
  constructTree(post, n) {
    // code here
    let index = n - 1;
    let postOrder = n - 1;

    let inorder = [...post].sort((a, b) => a - b);

    const build = (stop) => {
      if (index < 0 || inorder[index] === stop) return null;

      const root = new Node(post[postOrder--]);
      root.right = build(root.data);
      index--;
      root.left = build(stop);
      return root;
    };

    return build();
  }
}

/*

Optimal

O(n) & O(h)

*/

class Solution {
  constructTree(postorder, n) {
    // We will process the postorder array from RIGHT to LEFT
    // because postorder is: Left → Right → Root
    // Reversing it gives: Root → Right → Left
    let i = postorder.length - 1;

    // Recursive function to construct BST using valid range (min, max)
    const construct = (min, max) => {
      // If all elements are already processed, stop recursion
      if (i < 0) return null;

      // Current value being considered
      let nodeVal = postorder[i];

      // Check if the current value can belong to this subtree
      // It must lie strictly within (min, max)
      if (min < nodeVal && nodeVal < max) {
        // Create a new tree node with the current value
        const root = new Node(nodeVal);

        // Move index to the previous element
        i--;

        /*
                    IMPORTANT:
                    Since we are reading postorder in reverse order,
                    the traversal becomes:
                        Root → Right → Left

                    Therefore:
                    1. Construct RIGHT subtree first
                       Allowed range: (root.data, max)

                    2. Construct LEFT subtree next
                       Allowed range: (min, root.data)
                */

        // Build right subtree
        root.right = construct(root.data, max);

        // Build left subtree
        root.left = construct(min, root.data);

        // Return the constructed subtree rooted at 'root'
        return root;
      }

      // If the value does not fit in the current range,
      // it does not belong to this subtree
      return null;
    };

    // Initial call:
    // The root can have any value, so we start with the full range
    return construct(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
  }
}
