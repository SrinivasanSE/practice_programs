// https://www.geeksforgeeks.org/write-a-c-program-to-calculate-size-of-a-tree/

class Solution {
    /**
    * @param Node node

    * @returns number
    */
    getSize(node) {
        // code here
        if (node == null) {
            return 0
        }
        
        const left = this.getSize(node.left)
        const right = this.getSize(node.right)
        
        return left + right + 1
    }
}