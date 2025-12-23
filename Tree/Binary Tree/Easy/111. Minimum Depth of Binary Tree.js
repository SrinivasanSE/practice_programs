// https://leetcode.com/problems/minimum-depth-of-binary-tree/description/


/*

Recursion

O(n) & O(n)

*/


var minDepth = function(root) {
    if(root===null)return 0;


        if(root.left===null){ // this check is needed because when one child is null, we need to check another child
            return 1 + minDepth(root.right);
        }

        if (root.right===null){
            return 1+ minDepth(root.left);
        }

        return 1 + Math.min(
            minDepth(root.left),
            minDepth(root.right)
        );
    
};


/*

Iterative

O(n) & O(n)

*/


function minDepth(root) {
    if (root === null) return 0;
    let queue = [root];
    let level = 1;

    while (queue.length > 0) {
        let length = queue.length;

        for (let index = 0; index < length; index += 1) {
            let node = queue.shift();
            let left = node.left;
            let right = node.right;

            if (left === null && right === null) return level;
            if (left) queue.push(left);
            if (right) queue.push(right);
        }

        level++
    }

    return level;
}