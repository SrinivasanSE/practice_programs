// https://www.geeksforgeeks.org/find-median-bst-time-o1-space/


class Solution {
    countNodes(root) {
        if (root === null) {
            return 0
        }
        let count = 0
        let curr = root
        let pred
        while (curr) {
            if (curr.left === null) {
                count++
                curr = curr.right
            } else {
                pred = curr.left
                while(pred.right && pred.right != curr) {
                    pred = pred.right
                }
                
                if (pred.right == null) {
                    pred.right = curr
                    curr = curr.left
                } else {
                    pred.right = null
                    curr = curr.right
                    count++
                }
            }
        }
        
        return count
    }
  	findMedian(root){
  		//code here
  		if (root === null) {
  		    return 0
  		}
  		let count = this.countNodes(root)
  		let currNodes = 0
  		let pred
  		let prev = null
  		let curr = root
  		while (curr) {
  		    if (curr.left == null) {
  		        currNodes++
                if (count % 2 != 0 && currNodes === (count + 1)/2) {
                    return curr.data
                }
                if (count % 2 === 0 && currNodes === (count/2) + 1) {
                    return (prev.data + curr.data)/2.0
                }
                
                prev = curr
                curr = curr.right
  		    } else {
                pred = curr.left
                while(pred.right && pred.right != curr) {
                    pred = pred.right
                }
                
                if (pred.right == null) {
                    pred.right = curr
                    curr = curr.left
                } else {
                    currNodes++
                    prev = pred

                if (count % 2 != 0 && currNodes === (count + 1)/2) {
                    return curr.data
                }
                if (count % 2 === 0 && currNodes === (count/2) + 1) {
                    return (prev.data + curr.data)/2.0
                }
                    prev = curr
                    pred.right = null
                    curr = curr.right
                }
            }
  		}
  		
  		console.log(count, currNodes)
  		
  	}
}




class Solution {
    inOrder(root, values) {
        if (root === null) {
            return
        }
        this.inOrder(root.left, values)
        values.push(root.data)
        this.inOrder(root.right, values)
    }
  	findMedian(root){
  		//code here
  		const values = []
  		this.inOrder(root, values)
  		values.sort((a, b) => a - b)
  		const n = values.length
  		if (n % 2 === 0) {
  		    return (values[n/2 - 1] + values[n/2])/2.0
  		} 
  		return values[Math.floor(n/2)]
  		
  		
  	}
}