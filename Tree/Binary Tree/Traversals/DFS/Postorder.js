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


/*

Iterative - Two Stacks

O(n) & O(2n)

*/


var postorderTraversal = function(root) {
    const nodes = []

    const stk1 = [], stk2 = []

    if (root == null) return nodes

    stk1.push(root)
    let node
    while (stk1.length > 0) { // similar to pre order, for pre order, we do root -> left > right, this code will do root -> right -> left and reverse it, we get left -> right -> root
        node = stk1.pop()

        if (node.left != null) stk1.push(node.left)
        if (node.right != null) stk1.push(node.right)

        stk2.push(node.val) // we use stk2 to reverse the values
    }

    while (stk2.length > 0) {
        nodes.push(stk2.pop())
    }
    
    return nodes
};


/*

Iterative - One stack

O(n) & O(n)

*/

/*
In post-order traversal (left, right, root), when using a single stack, we need to know if we've already visited the right subtree of a node before processing the node itself.

If we just pop a node when there's no left child, we might process the node before its right child.
lastVisited helps us track if we've already processed the right child, so we only process the node (add to result) after both left and right have been traversed.

*/

var postorderTraversal = function (root) {
    const nodes = []

    const stk = []

    if (root == null) return nodes

    let current = root, lastVisited, peek

    while (current || stk.length > 0) {
        if (current) { // go left as much as possible
            stk.push(current)
            current = current.left
        } else {
            peek = stk[stk.length - 1] // if there is no left, go to right
            if (peek.right && peek.right != lastVisited) { // if the right is there and we did not visit it already, go to right
                current = peek.right
            } else { // if there is no right, process the node
                nodes.push(peek.val)
                lastVisited = stk.pop()
            }
        }
    }

    return nodes
};