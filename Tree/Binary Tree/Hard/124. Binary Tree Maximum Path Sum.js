// https://leetcode.com/problems/binary-tree-maximum-path-sum/description/

/*

Recursion - Similar to max height 

O(n) & O(n)

*/

var maxPathSum = function (root) {
  let maxSum = -Infinity;
  const findPathSum = (node) => { // post order
    if (node == null) return 0;

    const left = Math.max(0, findPathSum(node.left)); // if the sum is negative, we should ignore that and take it as 0, since negative value will not increase the sum
    const right = Math.max(0, findPathSum(node.right));

    maxSum = Math.max(maxSum, left + right + node.val); // store the maxSum

    return node.val + Math.max(left, right); // we want the maxPath sum, we take the max sum of left or right and
    // also the path can't be through both left and right from the parent node. it can either go to left or right,
    // the child node can take a curved path, which will be anyway handled by the parent node sum
  };
  findPathSum(root);
  return maxSum;
};


/*

Iterative

O(n) & O(n)

*/

var maxPathSum = function(root) {
    let maxSum = -Infinity;

    // Map to store max gain from each node
    const gain = new Map();

    // Stack for postorder traversal: [node, visited]
    const stack = [[root, false]];

    while (stack.length > 0) {
        const [node, visited] = stack.pop();

        if (node === null) continue;

        if (!visited) {
            // Postorder: left → right → node
            stack.push([node, true]);
            stack.push([node.right, false]);
            stack.push([node.left, false]);
        } else {
            // Get gains from children (ignore negatives)
            const leftGain = Math.max(0, gain.get(node.left) || 0);
            const rightGain = Math.max(0, gain.get(node.right) || 0);

            // Path passing through this node
            const currentPathSum = node.val + leftGain + rightGain;
            maxSum = Math.max(maxSum, currentPathSum);

            // Gain to parent
            gain.set(node, node.val + Math.max(leftGain, rightGain));
        }
    }

    return maxSum;
};