// https://leetcode.com/problems/binary-tree-paths/description/
// https://www.geeksforgeeks.org/given-a-binary-tree-print-all-root-to-leaf-paths/

// Refer Print path from root to a given node in a binary tree.js for printing the path for a specific node

// For this program, return all root-to-leaf paths

/*

Recursion - Preorder traversal

O(N*H) & O(N*H)

*/


const isLeaf = (node) => node.left == null && node.right == null

var binaryTreePaths = function (root) { // using path arr
    const paths = [], path = []

    const traverse = (node, path) => {
        if (node == null) return

        path.push(node.val) // add the node val

        if (isLeaf(node)) { // if the current node is leaf, push the path
            paths.push([...path].join("->"))
        } else {
            traverse(node.left, path)
            traverse(node.right, path)
        }

        path.pop() // keep backtracking to remove the node
    }

    traverse(root, path)
    return paths
};


var binaryTreePaths = function (root) { // using path as string
    const paths = []

    const traverse = (node, path) => {
        if (node == null) return

        path += node.val
        if (isLeaf(node)) {
            paths.push(path)
            return
        }
        path += "->" // using str will take care of backtracking
        traverse(node.left, path)
        traverse(node.right, path)
    }

    traverse(root, "")
    return paths
};


/*

Iterative - Pre order traversal

O(N*H) & O(N*H)

*/


var binaryTreePaths = function (root) {
    const paths = []
    if (root == null) return paths
    const stk = [[root, "" + root.val]] // push the node val as string

    while (stk.length > 0) { // pre order traversal
        let [node, path] = stk.pop()

        if (isLeaf(node)) { // if it's leaf, push the value
            paths.push(path)
        }

        if (node.right) {
            stk.push([node.right, path + "->" + node.right.val]) // create the path
        }

        if (node.left) {
            stk.push([node.left, path + "->" + node.left.val])
        }
    }
    
    return paths
}