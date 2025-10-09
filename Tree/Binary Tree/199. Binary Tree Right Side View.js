// https://leetcode.com/problems/binary-tree-right-side-view/description/
// https://www.geeksforgeeks.org/problems/left-view-of-binary-tree/1

//*************************************************************** Right side ********************************************************************************/

/*

Recursion - DFS

O(n) & O(n)

*/

var rightSideView = function(root) { // we need to push the right side node at each level
    let res = []
    if (root == null) return res

    const traversal = (node, res, level) => {
        if (node == null) return
        
        if (res.length === level) { // right node will first come here and length will be equal to the level, so we push the value
            res.push(node.val)
        }

        traversal(node.right, res, level + 1) // go to right first
        traversal(node.left, res, level + 1)
    }
    traversal(root, res, 0)
    return res
};


/*

Iterative - Level order traversal

O(n) & O(n)

*/


var rightSideView = function(root) {
    let res = []
    if (root == null) return res

    const q = [root]
    let level = 0
    while (q.length > 0) {
        let len = q.length
        for (let i = 0; i < len; i++) {
            const node = q.shift()
            /*
                if (i === len - 1) res[level] = node.val or res.push(node.val) and no need to use level var
            */
            res[level] = node.val // keep updating the value at this level, first left node's value will be added and then at the right side node's val will be updated

            if (node.left) q.push(node.left)
            if (node.right) q.push(node.right)
        }
        level++
    }

    return res
};



//*************************************************************** Left side ********************************************************************************/

/*

Recursion - DFS

O(n) & O(n)

*/


class Solution {
    leftView(root) {
        // code here
        const res = []
        if (root == null) return res
        
        const traversal = (node, level, res) => {
            if (node == null) return
            
            if (res.length === level) {
                res.push(node.data)
            }
            
            traversal(node.left, level + 1, res) // first go to left
            traversal(node.right, level + 1, res)
        }
        traversal(root, 0, res)
        
        return res
    }
}

/*

Iterative - Level order traversal

O(n) & O(n)

*/


class Solution {
    leftView(root) {
        // code here
        const res = []
        if (root == null) return res
        const q = [root]
        let level = 0
        while (q.length > 0) {
            let len = q.length
            
            for (let i = 0; i < len; i++) {
                const node = q.shift()
                if (i === 0) res[level] = node.data
                
                if (node.left) q.push(node.left)
                if (node.right) q.push(node.right)
            }
            
            level++
        }
        
        return res
    }
}