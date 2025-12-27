// https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/


/*

Recursion

O(n) & O(n)

*/


var lowestCommonAncestor = function (root, p, q) { // if both p and q are smaller than the parent, you move to the left. If both p and q are larger than the parent, you move to the right. 
// At some point, if only one of the nodes is larger, that will be the lowest common ancestor.
    if (root == null) return root

    if (root.val < p.val && root.val < q.val) {
        return lowestCommonAncestor(root.right, p, q)
    }
    if (root.val > p.val && root.val > q.val) {
        return lowestCommonAncestor(root.left, p, q)
    }

    return root
};


/*

Iterative

O(n) & O(1)

*/

var lowestCommonAncestor = function (root, p, q) {
    let curr = root

    while (curr) {
        if (curr.val < p.val && curr.val < q.val) { // move to the right since both are in the right side
            curr = curr.right
        } else if (curr.val > p.val && curr.val > q.val) { // move to the left since both are in the right side
            curr = curr.left
        } else { // they are in diff side, so this is where it's get split
            return curr
        }
    }

    return curr
};