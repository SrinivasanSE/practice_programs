// https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/description/


/*

Brute

O(n^2) & O(n)

*/


const insertNode = (root, val) => {
    if (root == null) {
        return new TreeNode(val)
    }

    if (root.val < val) {
        root.right = insertNode(root.right, val)
    } else {
        root.left = insertNode(root.left, val)
    }

    return root
}


var bstFromPreorder = function(preorder) {
    let root = new TreeNode(preorder[0])

    for (let i = 1; i < preorder.length; i++) { // insert each node one by one
        root = insertNode(root, preorder[i])
    }

    return root

};


/*

Better - Same as 105. program

O(nlogn) & O(n)

*/



var bstFromPreorder = function (preorder) {
    let index = 0, i = 0
    const inorder = [...preorder].sort((a, b) => a - b) // find inorder from preorder
    const dfs = (stop) => {
        if (index >= preorder.length || inorder[i] === stop) return null
        const rootValue = preorder[index++]
        const root = new TreeNode(rootValue)
        root.left = dfs(rootValue)
        i++
        root.right = dfs(stop)
        return root

    }

    return dfs()

};


/*

Optimal

O(n) & O(n)


*/

// We don't need to care about lower bound. When we construct the tree, we try to create left node first. 
// If the condition fails (i.e. current number is greater than the parent node value), 
// then we try to create the right node which automatically satisfies the condition, 
// hence we will not ever place a element lesser than the root to the right, if it was lesser than the root, it would have been placed in the left

var bstFromPreorder = function (preorder) {
    let i = 0
    const n = preorder.length
    const construct = (upperBound) => {
        if (i >= n || preorder[i] > upperBound ) return null  // if it's greater than the upperbound, we can't insert it at this place, so return null

        const root = new TreeNode(preorder[i++])

        root.left = construct(root.val) // for left, the upper bound will be current node's val
        root.right = construct(upperBound) // for right, the upper bound will be current node's upperbound

        return root

    }

    return construct(Number.MAX_SAFE_INTEGER)

};

/*

When building from preorder left to right:

Once you start the right subtree,
you will never see a value smaller than the root again

So:

The lower bound is implicitly handled

You only need to prevent values greater than allowed.

Look at this preorder:

[8, 5, 1, 7, 10, 12]


When you are building:

Left subtree of 8 → all values < 8

Once you hit 10, you cannot go back to smaller values

So:

Lower bound never needs checking

Preorder order itself enforces it

*/