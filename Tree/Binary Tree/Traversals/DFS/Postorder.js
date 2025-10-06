// https://www.geeksforgeeks.org/postorder-traversal-of-binary-tree/
// https://leetcode.com/problems/binary-tree-postorder-traversal/description/


/*

Brute - Recursion

O(n) & O(n)

*/


var inorderTraversal = function (root) {
    const nodes = []

    const traversal = (node) => {
        if (node == null) return

        traversal(node.left)
        nodes.push(node.val)
        traversal(node.right)
    }

    traversal(root)
    return nodes
};