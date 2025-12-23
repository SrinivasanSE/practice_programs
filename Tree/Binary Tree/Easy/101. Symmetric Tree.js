// https://leetcode.com/problems/symmetric-tree/description/


/*

Recursion

O(n) & O(h)

*/


var isSymmetric = function(root) {
    if (root == null) return true

    const isMirror = (left, right) => {
        if (left == null && right == null) return true

        if (left == null || right == null) return false

        return left.val === right.val && isMirror(left.left, right.right) && isMirror(left.right, right.left) // check left and right node
    }

    return isMirror(root.left, root.right)
};


/*

Iterative

O(n) & O(n)

*/


var isSymmetric = function(root) {
    let queue = [root.left, root.right];

    while (queue.length) {
        let left = queue.shift();
        let right = queue.shift();

        if (!left && !right) continue;
        if (!left || !right || left.val !== right.val) return false;

        queue.push(left.left, right.right);
        queue.push(left.right, right.left);
    }

    return true;
};