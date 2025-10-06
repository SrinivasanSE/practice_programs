// https://www.geeksforgeeks.org/inorder-traversal-of-binary-tree/
// https://leetcode.com/problems/binary-tree-inorder-traversal/description/


/*

Brute - Recursion

O(n) & O(n)

*/

var inorderTraversal = function (root) { // left -> root -> right
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


/*

Iterative - Stack

O(n) & O(n)

*/


var inorderTraversal = function (root) {
    const nodes = []
    const stk = []

    if (root == null) return nodes

    let node = root
    while (true) { // run till true, break will stop the loop
        if (node !=  null) { // if the node is not null, push to stack and keep moving left
            stk.push(node)
            node = node.left
        } else { // if the node is null, we have moved all the way to the left and now we have to print the root node and move to right
            if (stk.length === 0) { // if the length becomes 0, that means all the nodes have been processed
                break
            }
            node = stk.pop()
            nodes.push(node.val)
            node = node.right
        }
    }

    return nodes
};