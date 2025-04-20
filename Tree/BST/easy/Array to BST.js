// https://www.geeksforgeeks.org/sorted-array-to-balanced-bst/


class Solution {
    
    BST(nums, l, h) {
        if (l > h) return null
            const mid = l + Math.floor((h - l)/2)
            let root = new Node(nums[mid])
            root.left = this.BST(nums, l, mid - 1)
            root.right = this.BST(nums, mid + 1, h)
            
            return root
    }
    sortedArrayToBST(nums) {
        // code here
        
        const n = nums.length
        const root =  this.BST(nums, 0, n - 1)
        return root
    }
}


class Solution {
    
    sortedArrayToBST(nums) {
        // code here
        
        const n = nums.length
        
        if (n === 0) {
            return null
        }
        
        const mid = Math.floor((n - 1)/2)
        const root = new Node(nums[mid])
        let q = [{node: root, range: [0, n - 1]}]
        let front = 0
        
        while (front < q.length) {
            const item = q[front]
            const curr = item.node
            const [s, e] = item.range
            const index = s + Math.floor((e - s)/2)
            
            if (s < index) {
                const midLeft = s + Math.floor((index - 1 - s)/2)   // end = index - 1
                curr.left = new Node(nums[midLeft])
                q.push({node: curr.left, range: [s, index - 1]})
            }
            if (e > index) {
                const midRight = index + 1 + Math.floor((e - index - 1)/2)   // s = index + 1
                curr.right = new Node(nums[midRight])
                q.push({node: curr.right, range: [index + 1, e]})
            }
            front++
        }
        return root
    }
}