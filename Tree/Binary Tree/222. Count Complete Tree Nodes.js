// https://leetcode.com/problems/count-complete-tree-nodes/description/


/*

Brute

O(n) & O(h)

*/


var countNodes = function(root) {
    if (root == null) return 0

    return 1 + countNodes(root.left) + countNodes(root.right)
};



/*

Optimised - Using property of complete tree

O(logn*logn) & O(h)

*/


var countNodes = function(root) {
    if (root == null) return 0

    const leftHeight = getHeight(root, true) // go to left
    const rightHeight = getHeight(root, false) // go to right, for a complete binary tree, if the heights are same, that means it's complete filled from left to right

    if (leftHeight === rightHeight) return ( 1 << leftHeight ) - 1 // if both the levels are same, that means this subtree is a complete binary tree, 
    // for complete binary trees, the node count will be 2^h - 1 and we don't have to traverse further to each node

    return 1 + countNodes(root.left) + countNodes(root.right)
};

const getHeight = (node, isLeft) => {
    let height = 0

    while (node) {
        height++
        node = isLeft ? node.left : node.right
    }

    return height

}

