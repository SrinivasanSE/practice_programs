// https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/


/*

Brute - Inorder traversal

O(n) & O(n)

*/


var kthSmallest = function(root, k) {
    const inorder = [];
    function dfs(node) {
        if (!node) return;
        dfs(node.left);
        inorder.push(node.val);
        dfs(node.right);
    }
    dfs(root);
    return inorder[k - 1];
};


/*

Better 

O(n) & O(n)

*/


var kthSmallest = function(root, k) { // instead of traversing all the nodes, traverse till we find the kth element and return after that
    let count = 0
    let res = 0
    const inorder = (node) => {
        if (node == null || count >= k) {
            return
        }

        inorder(node.left)
        count++
        if (count === k) {
           res = node.val
           return
        }
        inorder(node.right)
    }

    inorder(root)

    return res
};


/*

Optimal - Morris inorder traversal

O(n) & O(1)

*/


var kthSmallest = function(root, k) { // inorder traversal returns the element in sorted order, so we can easily find the kth element
    let count = 0

    let curr = root, prev

    while (curr) {
        if (curr.left == null) {
            if (count === k - 1) {
                return curr.val
            }
            count++
            curr = curr.right
        } else {
            prev = curr.left

            while (prev.right && prev.right != curr) {
                prev = prev.right
            }

            if (prev.right == null) {
                prev.right = curr
                curr = curr.left
            } else {
                prev.right = null
                if (count === k - 1) {
                    return curr.val
                }
                count++
                curr = curr.right
            }
        }
    }
};