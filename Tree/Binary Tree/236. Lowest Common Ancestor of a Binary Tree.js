// https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/


/*

Recursion/Iterative - Find paths of two nodes and find the last common node

O(2n) & O(2n)


*/


const getPath = (node, val, path) => { // can use iterative approach as well
    if (node == null) return false
    path.push(node)
    if (node === val) {
        return true
    }

    if (getPath(node.left, val, path) || getPath(node.right, val, path)) {
        return true
    }

    path.pop()
    return false
}


var lowestCommonAncestor = function(root, p, q) {

    if (root == null ) return root

    let pathA = [], pathB = []

    // get the path of both the nodes

    getPath(root, p, pathA) 
    getPath(root, q, pathB)


    let lca = null;
    for (let i = 0; i < Math.min(pathA.length, pathB.length); i++) {
        if (pathA[i] === pathB[i]) {
            lca = pathA[i];
        } else {
            break;
        }
    }
    return lca;
};


/*

Recursion

O(n) & O(n)

*/


var lowestCommonAncestor = function(root, p, q) {

    if (root == null || root == p || root == q) return root // if the current node is matching, return it

    const left = lowestCommonAncestor(root.left, p, q)
    const right = lowestCommonAncestor(root.right, p, q)

    if (left != null && right != null) { // if both left and right are not null, that means the current node is the ancestor
        return root
    }

    return left || right // if one of the node is not null, return it, it will propagate to the top

};