// https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/


/*

O(n) & O(n)

*/


var zigzagLevelOrder = function (root) { // similar to level order traversal, but need to change the index
    if (root == null) return []
    const q = []
    q.push(root)
    let level = 0, index, leftToRight = true //use this flag
    let res = []

    while (q.length > 0) {
        let len = q.length
        res[level] = new Array(len)
        for (let i = 0; i < len; i++) {
            const node = q.shift()
            if (node.left) q.push(node.left)
            if (node.right) q.push(node.right)
            index = leftToRight ? i : len - i - 1 // based on the flag, change the index
            res[level][index] = node.val
        }
        level++
        leftToRight = !leftToRight // toggle the flag for each level

    }

    return res
};