// https://www.geeksforgeeks.org/bottom-view-binary-tree/


/*

DFS

O(n) & O(n)

*/


class Solution {
    bottomView(root) { // from the bottom, whatever node we see, we need to print, if both nodes are in the same level, pick the one which comes later in the level order traversal
        // code here
        const res = []
        if (root == null) return res
        const map = {}
        let minLine = 0, maxLine = 0
       
        const dfs = (node, line, level) => {
            if (node == null) return
            
            if (!map[line] || map[line][1] <= level) { // if the current level is same or greater, pick, for topview, we used >
                map[line] = [node.data, level]
            }
            
            minLine = Math.min(minLine, line)
            maxLine = Math.max(maxLine, line)
            
            dfs(node.left, line - 1, level + 1)
            dfs(node.right, line + 1, level + 1)
        }
        
        dfs(root, 0, 0)
        
        
        for (let i = minLine; i <= maxLine; i++) {
            if (map[i])
                res.push(map[i][0])
        }
        
        return res
    }
}


/*

BFS

O(n) & O(n)

*/


class Solution {
    bottomView(root) {
        // code here
        const res = []
        const q = []
        if (root == null) return res
        q.push([root, 0])
        const map = {}
        let minLine = 0, maxLine = 0
        while (q.length > 0) {
            const [node, line] = q.shift()
            
            map[line] = node.data // keep updating the map, we will always pick the one which appears later in the level order traversal if they are in the same level
            
            minLine = Math.min(minLine, line)
            maxLine = Math.max(maxLine, line)
            
            if (node.left) q.push([node.left, line - 1])
            if (node.right) q.push([node.right, line + 1])
            
        }
        
        
        for (let i = minLine; i <= maxLine; i++) {
            if (map[i])
                res.push(map[i])
        }
        
        return res
    }
}
