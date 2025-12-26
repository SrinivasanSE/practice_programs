// https://www.geeksforgeeks.org/check-two-nodes-cousins-binary-tree/
// https://leetcode.com/problems/cousins-in-binary-tree/description/

// Also we can use the code to check if the nodes are siblings

/*

To be Cousins

1. The two Nodes should be on the same level in the binary tree.
2. The two Nodes should not be siblings (means that they should not have the same parent Node).

*/

/*

Recursion

O(n) & O(n)

*/

/*

The idea is to check the level of both the given node values using depth first search. 
If their levels are same, then check if they are children of same or different nodes. 
If they have same parent, then return false. else, return true.

*/

class Solution {
  siblings(root, a, b) {
    if (root == null) {
      return false;
    }

    if (
      // They should not have same parent, // checking left is eq to a
      root.left &&
      root.right &&
      root.left.data === a &&
      root.right.data === b
    ) {
      return true;
    }

    if (
      // checking left is eq to b
      root.left &&
      root.right &&
      root.left.data === b &&
      root.right.data === a
    ) {
      return true;
    }

    return this.siblings(root.left, a, b) || this.siblings(root.right, a, b);
  }

  level(node, searchNode, lev) {
    // same as depth, instead of returning 0, return -1
    if (node == null) {
      return 0;
    }
    if (node.data === searchNode) {
      return lev;
    }
    const l = this.level(node.left, searchNode, lev + 1);
    if (l != 0) {
      return l;
    }

    return this.level(node.right, searchNode, lev + 1);
  }
  isCousins(root, a, b) {
    // code here
    if (a === b) {
      return false;
    }

    const alevel = this.level(root, a, 1); // get the level of the node
    const blevel = this.level(root, b, 1);

    if (alevel == 0 || blevel == 0) {
      // if the node is not found, return false
      return false;
    }

    return alevel === blevel && !this.siblings(root, a, b); // level should be same and they should not be siblings
  }
}

/*

Iterative - Level order traversal

O(n) & O(n)

*/

class Solution {
  isCousins(root, a, b) {
    // If tree is empty, cousins are impossible
    if (!root) {
      return false;
    }

    // A node cannot be cousin of itself
    if (a === b) {
      return false;
    }

    // Queue for level-order traversal (BFS)
    const q = [root];

    // Flags to check whether a and b are found
    // at the CURRENT level
    let aFound = false;
    let bFound = false;

    // BFS traversal
    while (q.length > 0) {
      // Number of nodes at current level
      let len = q.length;

      // Process exactly one level
      for (let i = 0; i < len; i++) {
        // Remove front node from queue
        let curr = q.shift();

        // Check if current node matches 'a'
        if (curr.data === a) {
          aFound = true;
        }

        // Check if current node matches 'b'
        if (curr.data === b) {
          bFound = true;
        }

        /* IMPORTANT CHECK - This is for checking if they are siblings and above conditions are for to check if they are present at the same level. 
        At node 3 itself, the condition will return false since they are siblings. So we will return early and won't go to the next level at all.
                 1
                / \
                2   3
                    / \
                    4   5

        If 'a' and 'b' are children of the same parent,
        then they are siblings, NOT cousins
        */
        if (
          curr.left &&
          curr.right &&
          ((curr.left.data === a && curr.right.data === b) ||
            (curr.left.data === b && curr.right.data === a))
        ) {
          // Siblings found → not cousins
          return false;
        }

        // Add left child to queue for next level
        if (curr.left) {
          q.push(curr.left);
        }

        // Add right child to queue for next level
        if (curr.right) {
          q.push(curr.right);
        }
      }

      // AFTER processing one full level:

      // If both a and b were found at the same level
      // and they are not siblings, they are cousins
      if (aFound && bFound) {
        return true;
      }

      // If only one of them was found at this level,
      // they cannot be cousins (levels differ)
      if (aFound || bFound) {
        return false;
      }

      // Reset flags implicitly by overwriting in next iteration
    }

    // If traversal ends without finding cousins
    return false;
  }
}

const isCousins = (root, x, y) => {
  let foundX = false;
  let xDepth = -1;
  let xParent = -1;
  let foundY = false;
  let yDepth = -1;
  let yParent = -1;

  const dfs = (node, level, parent = null) => {
    // find the parent and depth of the node
    if (!node) return;

    if (node.val === x) {
      foundX = true;
      xDepth = level;
      xParent = parent;
      return;
    }

    if (node.val === y) {
      foundY = true;
      yDepth = level;
      yParent = parent;
      return;
    }

    dfs(node.left, level + 1, node.val);
    dfs(node.right, level + 1, node.val);
  };

  dfs(root, 0);
  // if the node is found, check the depth and parent
  if (foundX && foundY) return xDepth === yDepth && xParent !== yParent;
  return false;
};
