// https://www.geeksforgeeks.org/boundary-traversal-of-binary-tree/

// Explore the Inorder traversal using morris traversal

/*

O(n) & O(n)

*/


const isLeaf = (node) => node.left == null && node.right == null

const leftBoundary = (node, res) => {
    if (!node) return
    let curr = node

    while (!isLeaf(curr)) {

        res.push(curr.data)
        if (curr.left)
            curr = curr.left
        else
            curr = curr.right
    }

    return res
}

const rightBoundary = (node, res) => {
    if (!node) return
    let curr = node
    let temp = []
    while (!isLeaf(curr)) {
        temp.push(curr.data)
        if (curr.right)
            curr = curr.right
        else
            curr = curr.left
    }

    for (let i = temp.length - 1; i >= 0; i--) // move from temp to res
        res.push(temp[i]);

    return res
}


const leaves = (node, res) => {
    if (node == null) return

    if (isLeaf(node)) {
        res.push(node.data)
        return
    }

    leaves(node.left, res)
    leaves(node.right, res)
}


class Solution {
    boundaryTraversal(root) { // need to traverse the tree in anti clockwise order
        // code here
        if (root == null) return []
        let res = []
        if (!isLeaf(root)) res.push(root.data)
        leftBoundary(root.left, res) // traverse the left nodes until the leaves node
        leaves(root, res) // collect the leaf nodes using inorder traversal
        rightBoundary(root.right, res) // traverse the right side nodes until the leaves node, we need to store it in a temp list and move it back to the res

        return res
    }
}