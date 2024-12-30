//https://www.geeksforgeeks.org/find-a-pair-with-the-given-difference/


class Solution {
    /**
     * @param number[] arr
     * * @param number x
     * @returns boolean
     */
    findPair(arr, x) {
        
        const hashmap = {}
        for(let i = 0; i < arr.length; i++) {
            const temp = arr[i] + x
            const temp1 = arr[i] - x
            //console.log(temp, temp1, hashmap, arr[i])
            if (hashmap[temp] || hashmap[temp1]) {
                return true
            }
            
            hashmap[arr[i]] = 1
        }
        
        return false
    }
}

class Solution {
    /**
     * @param number[] arr
     * * @param number x
     * @returns boolean
     */
    findPair(arr, x) {
        arr.sort((a, b) => a - b)
        const n = arr.length
        let l = 0, r = 1
        
        while (l < n && r < n) {
            let diff = arr[r] - arr[l]
            if (l != r && diff === x) {
                return true
            }
            
            if (diff < x) {
                r++
            } else {
                l++
            }
        }
        
        return false
        
    }
}


class Solution {
    /**
     * @param number[] arr
     * * @param number x
     * @returns boolean
     */
    findPair(arr, x) {
        arr.sort((a, b) => a - b)
        const n = arr.length
        for(let i = 0; i < n; i++) {
            const target= arr[i] + x
            const index = this.binarySearch(arr, i + 1, n - 1, target)
            if(index !== -1) {
                return true
            }
        }
        
        
        
        return false
        
    }
    
    binarySearch(arr, l, h, target) {
        while (l <= h) {
            const mid = l + Math.floor((h - l)/2)
            
            if (arr[mid] === target) {
                return mid
            }
            
            if (arr[mid] < target) {
                l = mid + 1
            } else {
                h = mid - 1
            }
        }
        
        return -1
    }
}
