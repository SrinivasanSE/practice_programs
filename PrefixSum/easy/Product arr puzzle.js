// https://www.geeksforgeeks.org/a-product-array-puzzle/


class Solution {
    productExceptSelf(arr) {
        // code here
        const n = arr.length
        let mul = 1
        let zero = 0
        let idx = -1
        for(let i = 0; i < n; i++) {
            if (arr[i]) {
                mul*=arr[i]
            } else {
                zero++
                idx = i
            }
        }
        
        let res = new Array(n).fill(0)
        
     
        if (zero === 0) {
            for(let i = 0; i < n; i++) {
                res[i] = mul/arr[i]
            }
        }
        else if (zero === 1) {
            res[idx] = mul
        }
        
        return res
    }
}

class Solution {
    productExceptSelf(arr) {
        // code here
        const n = arr.length
        const prefix = new Array(n + 1).fill(0)
        prefix[0]  = 1
        
        for(let i = 1; i < n; i++) {
            prefix[i] = prefix[i - 1]*arr[i - 1]
        }
        
        let suffix = 1
        let res = new Array(n).fill(0)
        for(let i = n - 1; i >= 0; i--) {
            res[i] = prefix[i]*suffix
            suffix*=arr[i]
        }
        
        return res
    }
}