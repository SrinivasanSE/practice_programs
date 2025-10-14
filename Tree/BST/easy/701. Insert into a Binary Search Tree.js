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


