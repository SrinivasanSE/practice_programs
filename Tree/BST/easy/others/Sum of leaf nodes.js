// 


function sumOfLeafNodes(root)
    {
        //your code here
        if (root === null) {
            return 0
        }
        
        if (root.left === null && root.right === null) {
            return root.data
        }
        
        return this.sumOfLeafNodes(root.left) + this.sumOfLeafNodes(root.right)
    }


    function sumOfLeafNodes(root)
    {
        //your code here
        let curr = root
        let sum = 0
        let stk = []
        while (curr || stk.length > 0) {
            
            while(curr) {
                stk.push(curr)
                curr = curr.left
            }
            
            curr = stk.pop()
            if (curr.left == null && curr.right == null) {
                sum += curr.data
            }
            curr = curr.right
            
        }
        
        return sum
    }