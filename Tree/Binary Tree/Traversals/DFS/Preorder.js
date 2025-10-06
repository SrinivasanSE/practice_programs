// https://www.geeksforgeeks.org/preorder-traversal-of-binary-tree/
// https://leetcode.com/problems/binary-tree-preorder-traversal/description/

/*

Brute - Recursion

O(n) & O(n)

*/

var preorderTraversal = function (root) { // root -> left -> right
    const nodes = []

    const traversal = (node) => {
        if (node == null) return

        nodes.push(node.val)
        traversal(node.left)
        traversal(node.right)
    }
    traversal(root)
    return nodes
};


/*

Iterative - Stack

O(n) & O(n)

*/

var preorderTraversal = function(root) {
    const nodes = []
    const stack = []
    if (root == null) return nodes

    stack.push(root)
    let node
    while (stack.length > 0) {
        node = stack.pop()
        if (node.right != null) { // we push right first and left later, so that left will be at the top of the stack in the next iteration
            stack.push(node.right)
        }

        if (node.left != null) {
            stack.push(node.left)
        }

        nodes.push(node.val)
    }
   
    return nodes
};