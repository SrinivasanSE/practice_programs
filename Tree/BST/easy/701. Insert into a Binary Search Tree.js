// https://leetcode.com/problems/insert-into-a-binary-search-tree/description/


/*

Recursion

O(n) & O(n)

*/


var insertIntoBST = function(root, val) {

    if (root == null) {
        return new TreeNode(val)
    }

    if (root.val < val) {
        root.right = insertIntoBST(root.right, val)
    } else {
        root.left = insertIntoBST(root.left, val)
    }

    return root
    
};


/*

Iterative

O(n) & O(1)

*/

var insertIntoBST = function(root, val) {

    let curr = root
    const node = new TreeNode(val)
    if (curr == null) return node
    while (curr) {
        if (curr.val < val) {
            if (curr.right == null) {
                curr.right = node
                break
            }
            curr = curr.right
        } else {
            if (curr.left == null) {
                curr.left = node
                break
            }
            curr = curr.left
        }

    }
    return root
};


