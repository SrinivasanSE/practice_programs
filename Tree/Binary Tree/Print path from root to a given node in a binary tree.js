// https://www.geeksforgeeks.org/dsa/print-path-root-given-node-binary-tree/

/*

Recursion - Preorder

O(n) & O(h)

*/


class Solution {
    // FunctioProot n to find the path from the
    // root to a given node with value 'x'
    getPath(root, arr, x) {
        // Base case: If the current
        // node is null, return false
        if (!root) {
            return false;
        }

        // Add the current node's
        // value to the path array
        arr.push(root.val);

        // If the current node's value is equal
        // to the target value 'x', return true
        if (root.val === x) {
            return true;
        }

        // Recursively search for the target value
        // 'x' in the left and right subtrees
        if (this.getPath(root.left, arr, x) ||
            this.getPath(root.right, arr, x)) {
            return true;
        }

        // If the target value 'x' is not found
        // in the current path, backtrack
        arr.pop();
        return false;
    }

    // Function to find and return the path from
    // the root to a given node with value 'B'
    solve(A, B) {
        // Initialize an empty
        // array to store the path
        const arr = [];

        // If the root node is null,
        // return the empty path array
        if (A === null) {
            return arr;
        }

        // Call the getPath function to find
        // the path to the node with value 'B'
        this.getPath(A, arr, B);

        // Return the path array
        return arr;
    }
}


/*

Iterative - Pre order

O(n) & O(h)

*/


function pathFromRootToNode(root, target) {
    if (!root) return [];

    // Stack: each entry is [node, pathArray]
    const stack = [[root, [root.val]]];

    while (stack.length > 0) {
        const [node, path] = stack.pop();

        // If we found the target, return the path
        if (node.val === target) {
            return path;
        }

        // Push right child first so left is processed first
        if (node.right) {
            stack.push([node.right, [...path, node.right.val]]);
        }
        if (node.left) {
            stack.push([node.left, [...path, node.left.val]]);
        }
    }

    return [];
}