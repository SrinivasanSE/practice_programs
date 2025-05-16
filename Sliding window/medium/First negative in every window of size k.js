// https://www.geeksforgeeks.org/first-negative-integer-every-window-size-k/




class Solution {
    firstNegInt(arr, k) {
        // write code here
        const n = arr.length
        
        let negI = 0
        let res = []
        
        
        for(let i = k - 1; i < n; i++) {
            
            while (negI < i && (negI <= i - k || arr[negI] >= 0 )) {
                negI++
            }
            
            if (negI < n && arr[negI] < 0) {
                res.push(arr[negI])
            } else {
                res.push(0)
            }
        }
        return res
    }
}



class Solution {
    firstNegInt(arr, k) {
        // write code here
        const n = arr.length
        
        let q = []
        let res = []
        
        
        for(let i = 0; i < n; i++) {
            if (arr[i] < 0) {
                q.push(i)
            }
            
            if (q[0] <= i - k) {
                q.shift()
            }
            
            if (i >= k - 1) {
                if (q.length === 0) {
                    res.push(0)
                } else {
                    res.push(arr[q[0]])
                }
            }
        }
        return res
    }
}



class Solution {
    firstNegInt(arr, k) {
        // write code here
        const n = arr.length
        
        let q = []
        let res = []
        for(let i = 0; i < k; i++) {
            if (arr[i] < 0) {
                q.push(i)
            }
        }
        
        for(let i = k; i < n; i++) {
            if (q.length === 0) {
                res.push(0)
            } else {
                res.push(arr[q[0]])
            }
            
            while (q[0] <= i - k) {
                q.shift()
            }
            
            if (arr[i] < 0) {
                q.push(i)
            }
        }
        if (q.length === 0) {
                res.push(0)
            } else {
                res.push(arr[q[0]])
            }
        return res
    }
}