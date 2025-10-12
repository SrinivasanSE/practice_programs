// https://leetcode.com/problems/flatten-binary-tree-to-linked-list/description/


/*

Recursion

O(n) & O(n)

*/


var flatten = function (root) { // will move to right and make the node's right connect to the prev and left as null
    let prev = null
    const makeFlat = (root) => {
        if (root == null) {
            return
        }

        makeFlat(root.right) // move to right first
        makeFlat(root.left)

        root.right = prev
        root.left = null
        prev = root // assign the prev
    }

    makeFlat(root)

    return root
};


/*

Iterative - Stack

O(n) & O(n)

*/


var flatten = function (root) {
    if (root == null) return null
    let stk = [root], curr

    while (stk.length > 0) {
        curr = stk.pop()

        if (curr.right) { // push right node first and then left, so that left node is on that top
            stk.push(curr.right)
        }

        if (curr.left) {
            stk.push(curr.left)
        }

        if (stk.length > 0) { // link the right with the left node
            curr.right = stk[stk.length - 1]
        }

        curr.left = null // set the node's left as null
    }

    return root
};


/*

Iterative - Morris traversal

O(n) & O(1)


*/


var flatten = function (root) {
    if (root == null) return null
    let curr = root, prev
    while (curr) {
        if (curr.left != null) {
            prev = curr.left
            while (prev.right) { // move right as much as possible
                prev = prev.right
            }

            prev.right = curr.right // connect the right most node to the curr's right
            curr.right = curr.left // make the curr right as curr left
            curr.left = null
        }
        curr = curr.right // move to right, the right is changed inside the if loop, so if changed, it will move to left
    }

    return root
};