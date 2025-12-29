// https://leetcode.com/problems/maximum-width-of-binary-tree/description/

/*

Recursive

O(n) & O(n)

*/

var widthOfBinaryTree = function (root) {
  let maxWidth = 0;

  // stores the first (leftmost) index seen at each level
  const firstIndexAtLevel = new Map();

  const dfs = (node, level, index) => {
    if (!node) return;

    // record first index for this level
    if (!firstIndexAtLevel.has(level)) {
      firstIndexAtLevel.set(level, index);
    }

    const start = firstIndexAtLevel.get(level);

    // width of current level
    maxWidth = Math.max(maxWidth, index - start + 1);

    // go left and right
    dfs(node.left, level + 1, index * 2);
    dfs(node.right, level + 1, index * 2 + 1);
  };

  // start index from 1 (same as your BFS version)
  dfs(root, 0, 1);

  return maxWidth;
};


/*

Iterative - Level order traversal

O(n) & O(n)

*/

// we assign the idx to each node and based on that index, we can find the max width

var widthOfBinaryTree = function (root) {
  let q = [[root, 1]]; // we start with 1, we can also start with 0, left should be 2*i + 1 and right should be 2*i + 2 in that case
  let start = 0,
    end = 0,
    len;
  let res = 0;
  while (q.length > 0) {
    len = q.length;
    start = q[0][1];
    end = q[len - 1][1];
    for (let i = 0; i < len; i++) {
      const [node, idx] = q.shift();
      updatedIdx = idx - start; // we do this to prevent the overflow
      if (node.left) {
        q.push([node.left, updatedIdx * 2]); // we use 1 based indexing, so for left, it's 2*i and for right, it's 2*i + 1
      }
      if (node.right) {
        q.push([node.right, updatedIdx * 2 + 1]);
      }
    }
    res = Math.max(res, end - start); // find the max
  }
  return res + 1; // we need to add 1 since end - start for ex: (0 - 3) will give 3 instead of 4
};
