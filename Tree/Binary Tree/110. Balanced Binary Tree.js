// https://leetcode.com/problems/balanced-binary-tree/description/

// A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.


/*

Brute

O(N^2) & O(n)

*/

var height = (node) => {
    if (node == null) return 0

    const lh = height(node.left)
    const rh = height(node.right)

    return 1 + Math.max(lh, rh)
}
var isBalanced = function (root) {

    if (root == null) return true

    const lh = height(root.left) // find the height of left and right tree
    const rh = height(root.right)

    if (Math.abs(rh - lh) > 1) return false // if the diff is more than 1, not a balanced tree

    const left = isBalanced(root.left)
    const right = isBalanced(root.right)

    if (!left || !right) { // if left or right is not balanced, return false
        return false
    }

    return true

};


/*

Optimal

O(n) & O(n)

*/

var height = (node) => { // we modify the height function to return -1 if it's not balanced and return the height as usual if it's balanced
    if (node == null) return 0

    const lh = height(node.left)

    if (lh === -1) return -1

    const rh = height(node.right)

    if (rh === -1) return -1

    if (Math.abs(rh - lh) > 1) return -1

    return 1 + Math.max(lh, rh)
}
var isBalanced = function (root) {

    return height(root) != -1


};