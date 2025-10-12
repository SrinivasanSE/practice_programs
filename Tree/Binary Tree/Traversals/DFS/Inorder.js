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

Better

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



/*

Optimal - Morris traversal

O(n) & O(1)

*/



var inorderTraversal = function(root) { // left - root - right
    let res = []
    let curr = root, prev

    while (curr) {
        if (curr.left == null) { // if left is null, add the root and move to right
            res.push(curr.val)
            curr = curr.right
        } else {
            prev = curr.left // move to left

            while (prev.right && prev.right != curr) {  // move to right as much as possible
                prev = prev.right
            }

            if (prev.right == null) { // if the right is null, there is no thread created yet, create the link to the root and move to left
                prev.right = curr
                curr = curr.left
            } else { // the right is pointing to the curr node and left is already traversed, so remove the link and add the curr node since the left is already done and move to right
                prev.right = null
                res.push(curr.val)
                curr = curr.right
            }

        }
    }

    return res
};