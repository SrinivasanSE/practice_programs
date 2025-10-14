// https://leetcode.com/problems/delete-node-in-a-bst/description/

/*

Iterative

O(n) & O(1)


*/


var deleteNode = function (root, key) {
    if (root == null) return root

    if (root.val == key) {
        return helper(root)
    }

    let curr = root

    while (curr) {
        if (curr.val < key) {
            if (curr.right && curr.right.val === key) {
                curr.right = helper(curr.right)
                break
            }
            curr = curr.right
        } else {
            if (curr.left && curr.left.val === key) {
                curr.left = helper(curr.left)
                break
            }
            curr = curr.left
        }
    }

    return root
};

const helper = (node) => {
    if (node.left == null) {
        return node.right
    }
    if (node.right == null) {
        return node.left
    }

    const rightNode = node.right // move the right node of the delete node to the last right node of the left side's right
    const lastNode = getLastRightNode(node.left)
    lastNode.right = rightNode

    return node.left // return node.left
}

const getLastRightNode = (node) => {
    if (node.right == null) {
        return node
    }

    return getLastRightNode(node.right)
}


/*

Recursion 

O(n) & O(n)

*/


var deleteNode = function (root, key) {
    if (root == null) return root

    if (root.val < key) {
        root.right = deleteNode(root.right, key)
    } else if (root.val > key) {
        root.left = deleteNode(root.left, key)
    } else { // when the node is equal to key
        if (root.left == null && root.right == null) return null

        if (root.left == null) return root.right
        if (root.right == null) return root.left

        const lastNode = getLastLeftNode(root.right) // get the last left node from the right
        root.val = lastNode.val // replace the val
        root.right = deleteNode(root.right, root.val) // delete the lastNode we found from the right tree
    }

    return root
    
};



const getLastLeftNode = (node) => {
    if (node.left == null) {
        return node
    }

    return getLastLeftNode(node.left)
}