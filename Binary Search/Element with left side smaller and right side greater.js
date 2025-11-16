// https://www.geeksforgeeks.org/find-the-element-before-which-all-the-elements-are-smaller-than-it-and-after-which-all-are-greater-than-it/

findElement(arr) {
        const n = arr.length
        
        let leftMax = Array(n).fill(0)
        leftMax[0] = Number.MIN_VALUE
        
        for(let i = 1; i < n; i++) {
            leftMax[i] = Math.max(leftMax[i - 1], arr[i - 1])
        }
        
        let rightMin = Number.MAX_VALUE
        
        for(let i = n -1; i >0; i--) {
            if (i != n-1 && leftMax[i] < arr[i] && arr[i] < rightMin) {
                return arr[i]
            }
            
            rightMin = Math.min(rightMin, arr[i])
        }
        
        return -1
    }




// User function Template for javascript

class Solution {
    findElement(arr) {
        const n = arr.length
        
        for(let i = 1; i < n - 1; i++) {
            let left = true
            let right = true
            for(let j = 0; j < n; j++) {
                if (j < i) {
                    if (arr[j] >= arr[i]) {
                        left = false
                        break
                    }
                } else if (i < j) {
                    if (arr[i] >= arr[j])  {
                        right = false
                        break
                    }
                }
            }
            
            //console.log(left, right, arr[i])
            
            if(left && right) {
                return arr[i]
            }
        }
        
        return -1
    }
}
