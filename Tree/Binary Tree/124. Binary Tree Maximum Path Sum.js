// https://leetcode.com/problems/binary-tree-maximum-path-sum/description/


/*

O(n) & O(n)

*/


var maxPathSum = function(root) {
    let maxSum = -Infinity
    const findPathSum = (node) => {
        if (node == null) return 0

        const left = Math.max(0, findPathSum(node.left)) // if the sum is negative, we should ignore that and take it as 0, since negative value will not increase the sum
        const right = Math.max(0, findPathSum(node.right))

        maxSum = Math.max(maxSum, left + right + node.val) // store the maxSum

        return node.val + Math.max(left, right) // we want the maxPath sum, we take the max sum of left or right and 
        // also the path can't be through both left and right from the parent node. it can either go to left or right, 
        // the child node can take a curved path, which will be anyway handled by the parent node sum
    }
    findPathSum(root)
    return maxSum
};