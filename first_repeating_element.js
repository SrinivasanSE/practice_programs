// https://www.geeksforgeeks.org/find-first-repeating-element-array-integers/

class Solution {
    // Function to return the position of the first repeating element.
    firstRepeated(arr) {
        const n = arr.length
        const hashmap = new Set()
        let minIndex = Number.MAX_SAFE_INTEGER
        for(let i = n - 1; i >= 0; i--) {
            if(hashmap.has(arr[i])) {
                minIndex = Math.min(minIndex, i)
            }
            
            hashmap.add(arr[i])
        }
        
        return minIndex === Number.MAX_SAFE_INTEGER ? -1 : minIndex+ 1
        
    
    }
}

class Solution {
    // Function to return the position of the first repeating element.
    firstRepeated(arr) {
        const n = arr.length
        const hashmap = {}
        for(let i = 0; i < n; i++) {
            hashmap[arr[i]] = (hashmap[arr[i]] || 0) + 1
        }
        for(let i = 0; i < n; i++) {
            if (hashmap[arr[i]] > 1) {
                return i + 1
            }
        }
    }
    
    return -1
    }
}
