// https://www.geeksforgeeks.org/element-1st-array-count-elements-less-equal-2nd-array/

// Add other approaches

function countEleLessThanOrEqual(a, b) {
        // code here
        let res = []
        b.sort((n1, n2) => n1 - n2)
        const bLength = b.length
        for(let i = 0; i < a.length; i++) {
            
            let l = 0
            let r = bLength - 1
            
            if (b[l] > a[i]) {
                res.push(0)
                continue
            }
            
            if (b[r] <= a[i]) {
                res.push(r + 1)
                continue
            }
            while (l <= r) {
                const mid = l + Math.floor((r - l)/2)
                
                if (b[mid] <= a[i]) {
                   l = mid + 1
                } else {
                    r = mid - 1
                }
            }
            
            res.push(l)
        }
        
        return res
    }
