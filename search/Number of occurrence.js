// https://www.geeksforgeeks.org/problems/number-of-occurrence2259/1?page=1&category=Searching&difficulty=Easy&sortBy=submissions

class Solution {
    // Function to count the occurrences of x in the array.
    countFreq(arr, target) {
        
        const n = arr.length
        const first = this.first(arr, 0, n - 1, target)
        if (first === -1) {
            return 0
        }
        const last = this.last(arr, 0, n - 1, target)
        
        return last - first + 1
        
    }
    
    first(arr, l, r, target) {
        let res = -1
        while (l <= r) {
            const mid = l + Math.floor((r - l)/2)
            
            if (arr[mid] === target) {
                r = mid - 1
                res = mid
            }
            else if (arr[mid] < target) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
        
        return res
    }
    
    last(arr, l, r, target) {
        let res = -1
        while (l <= r) {
            const mid = l + Math.floor((r - l)/2)
            
            if (arr[mid] === target) {
                l = mid + 1
                res = mid
            }
            else if (arr[mid] < target) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
        
        return res
    }
}

countFreq(arr, target) {
        
        const n = arr.length
        let count = 0
        let l = 0, r = n - 1
        while (l <= r) {
            if (arr[l] === target) {
                count++
            }
            if (arr[r] === target && l != r) {
                count++
            }
            l++
            r--
        }
        
        return count
    }
