// https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/

/*

Brute

O(n^2) & O(n)

*/

var buildTree = function (preorder, inorder) {
  // pre order contains root of the node first
  let preOrderIndex = 0;

  const dfs = (start, end) => {
    if (start > end) return null;

    const rootValue = preorder[preOrderIndex++]; // pre order contains root of the nodes

    const root = new TreeNode(rootValue); // create the root

    let mid = start;
    while (mid <= end && inorder[mid] != rootValue) {
      // find the root position in the inorder array to find how many elements are in the left and how many are in the right
      mid++;
    }

    root.left = dfs(start, mid - 1);
    root.right = dfs(mid + 1, end);

    return root;
  };

  return dfs(0, preorder.length - 1);
};

/*

Better - Using map

O(n) & O(n)

*/

var buildTree = function (preorder, inorder) {
  const inOrderMap = new Map();

  for (let i = 0; i < inorder.length; i++) {
    inOrderMap.set(inorder[i], i);
  }

  let preOrderIndex = 0;

  const dfs = (start, end) => {
    if (start > end) return null;

    const rootValue = preorder[preOrderIndex++];

    const root = new TreeNode(rootValue);

    const mid = inOrderMap.get(rootValue); // using map, we can get the index easily

    root.left = dfs(start, mid - 1);
    root.right = dfs(mid + 1, end);

    return root;
  };

  return dfs(0, inorder.length - 1);
};

/*

Optimal - without map

O(n) & O(n)

*/

var buildTree = function (preorder, inorder) {
  let preOrderIndex = 0,
    index = 0;

  const build = (stop) => {
    // we use the stop as a boundary for left and right subtree
    if (index >= inorder.length || inorder[index] === stop) return null;

    const root = new TreeNode(preorder[preOrderIndex++]);
    root.left = build(root.val); // the left will move till the parent's root
    index++;
    root.right = build(stop);
    return root;
  };

  return build();
};

/*

stop for left = root value → left subtree ends at root in inorder when inorder[index] === stop

stop for right = parent’s stop → right subtree ends at parent boundary

preIndex always picks the next root from preorder

inIndex moves linearly through inorder → ensures correct placement

*/
