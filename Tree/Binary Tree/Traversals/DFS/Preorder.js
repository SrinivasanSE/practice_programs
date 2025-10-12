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


/*

Iterative - Morris traversal

O(n) & O(1)


*/


var preorderTraversal = function(root) { // root - left - right
    let res = []
    let curr = root, prev

    while (curr) {
        if (curr.left == null) { // if left is null, we add the node and move to right
            res.push(curr.val)
            curr = curr.right
        } else {
            prev = curr.left
            while (prev.right && prev.right != curr) {
                prev = prev.right
            }

            if (prev.right == null) { // for preorder, we need to add the root first, so before moving to left, we add the node and then move to left
                prev.right = curr
                res.push(curr.val) // similar to inorder traversal except this, we add the val in if block instead of else
                curr = curr.left
            } else {
                prev.right = null
                curr = curr.right
            }
        }
    }

    return res
};