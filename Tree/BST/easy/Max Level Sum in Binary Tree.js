// https://www.geeksforgeeks.org/find-level-maximum-sum-binary-tree/

class Solution {
    maxLevelSum(root){
        //code here
        let sum = -Infinity
        
        let q = [root]
        
        while (q.length > 0) {
            let len = q.length
          let temp = 0
            for(let i = 0; i < len; i++) {
                let curr = q.shift()
              temp += curr.data
                if (curr.left) q.push(curr.left)
                if (curr.right) q.push(curr.right)
            }
            
            sum = Math.max(sum, temp)
        }
        
        return sum
    }
}


class Solution {
    
    dfs(node, mm, level) {
        if (node == null) {
            return
        }
        
        mm[level] = (mm[level] || 0) + node.data
        
        level++
        this.dfs(node.left, mm, level)
        
        this.dfs(node.right, mm, level)
    }
  	maxLevelSum(root){
  		//code here
  		if (root == null) {
  		    return 0
  		}
  		
  		const mm = {}
  		
  		this.dfs(root, mm, 0)
  		
  		let res = Number.MIN_SAFE_INTEGER
  		
  		for(let val of Object.values(mm)) {
  		    res = Math.max(res, val)
  		}
  		
  		return res
  		
  		
  	}
}