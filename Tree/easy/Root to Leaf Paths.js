// https://www.geeksforgeeks.org/given-a-binary-tree-print-all-root-to-leaf-paths/


class Solution {
    /**
    * @param Node root

    * @returns number[][]
    */
    Paths(root) {
        // code here
        let paths = []
        let currentPath = []
        this.dfs(root, paths, currentPath)
        return paths
    }
    
    dfs(node, paths, currentPath) {
        if (node == null) {
            return
        }
        
        currentPath.push(node.data)
        if (node.left == null && node.right == null) {
            paths.push([...currentPath])
        } else {
            this.dfs(node.left, paths, currentPath)
            this.dfs(node.right, paths, currentPath)
        }
        currentPath.pop()
    }
}