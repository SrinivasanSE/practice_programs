// https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/


/*

Brute

O(n^2) & O(1)

*/


var buildTree = function (inorder, postorder) {

    let postOrderIndex = postorder.length - 1 // for postorder, the root will be at the end
    const dfs = (start, end) => {
        if (start > end) return null

        const rootValue = postorder[postOrderIndex--]
        const root = new TreeNode(rootValue)

        let mid = start

        while (mid < inorder.length && inorder[mid] != rootValue) {
            mid++
        }

        root.right = dfs(mid + 1, end) // since for postorder, left - right - root, we should first do right
        root.left = dfs(start, mid - 1)
       

        return root
    }

    return dfs(0, inorder.length - 1)

};


/*

Better - Using map

O(n) & O(n)

*/


var buildTree = function (inorder, postorder) {
    const inOrderMap = new Map()
    for (let i = 0; i < inorder.length; i++) {
        inOrderMap.set(inorder[i], i)
    }
    let postOrderIndex = postorder.length - 1 // start from end
    const dfs = (start, end) => {
        if (start > end) return null

        const rootValue = postorder[postOrderIndex--]
        const root = new TreeNode(rootValue)

        const mid = inOrderMap.get(rootValue) // use map to reduce time complexity

        root.right = dfs(mid + 1, end)
        root.left = dfs(start, mid - 1)
       

        return root
    }

    return dfs(0, inorder.length - 1)

};


/*

Optimal - without map

O(n) & O(n)

*/


var buildTree = function (inorder, postorder) {
    let index = inorder.length - 1, postOrderIndex = postorder.length - 1 // both should start from end

    const dfs = (stop) => {
       if (index < 0 || inorder[index] === stop) return null

        const root = new TreeNode(postorder[postOrderIndex--])

        root.right = dfs(root.val) // build right first till we encounter the root, we move from right to left
        index-- // decrement the index
        root.left = dfs(stop)

        return root

    }

    return dfs()
};

