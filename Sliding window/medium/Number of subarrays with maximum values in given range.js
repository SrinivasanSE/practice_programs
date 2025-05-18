// https://www.geeksforgeeks.org/number-subarrays-maximum-value-given-range/


// Two pointer approach
class Solution {
    
    // Complete the function countSubarrays here
    countSubarrays(arr, n, L, R) {
        // your code here

        let lastValid = -1, lastInvalid = -1, count = 0
        
        for(let i = 0; i < n; i++) {
            
            if (arr[i] > R) {
                lastInvalid = i
                lastValid = -1
            }
            
            if (arr[i] >= L && arr[i] <= R) {
                lastValid = i
            }
            
            if (lastValid != -1) {
                count += lastValid - lastInvalid
            }
        }
        
        return count
    }
}

class Solution {
    count(arr, ele) {
        let start = 0
        let c = 0
        
        for(let end = 0; end < arr.length; end++) {
            if (arr[end] > ele) {
                start = end + 1
            } else {
                c += end - start + 1
            }
        }
        
        return c
    }
    // Complete the function countSubarrays here
    countSubarrays(a, n, L, R) {
        // your code here
        return this.count(a, R) - this.count(a, L - 1)
    }
}


class Solution {
    // Complete the function countSubarrays here
    countSubarrays(a, n, L, R) {
        // your code here
        let high, count = 0
        
        for(let i = 0; i < n; i++) {
            high = -Infinity
            
            for(let j = i; j < n; j++) {
                
                high = Math.max(high, a[j])
                if (high >= L && high <= R) {
                    count++
                }
            }
        }
        
        return count
    }
}