// https://leetcode.com/problems/maximum-width-of-binary-tree/description/


/*

Iterative - Level order traversal

O(n) & O(n)

*/

// we assign the idx to each node and based on that index, we can find the max width

var widthOfBinaryTree = function (root) {
    let q = [[root, 1]]
    let start = 0, end = 0, len
    let res = 0
    while (q.length > 0) {
        len = q.length
        start = q[0][1]
        end = q[len - 1][1]
        for (let i = 0; i < len; i++) {
            const [node, idx] = q.shift()
            updatedIdx = idx - start // we do this to prevent the overflow
            if (node.left) {
                q.push([node.left, updatedIdx * 2]) // for left, it's 2*i and for right, it's 2*i + 1 
            }
            if (node.right) {
                q.push([node.right, updatedIdx * 2 + 1])
            }
        }
        res = Math.max(res, end - start) // find the max
    }
    return res + 1
};