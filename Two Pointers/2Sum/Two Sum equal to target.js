// https://www.geeksforgeeks.org/check-if-pair-with-given-sum-exists-in-array/
// https://www.geeksforgeeks.org/pair-with-given-product-set-1-find-if-any-pair-exists/


// Hashing for unsorted input
twoSum(arr, target) {
        const n = arr.length
        if (n <= 1) {
            return false
        }
        const map = new Set()
        for(let i = 0; i < n; i++) {
            const expectedNum = target - arr[i]
            if (map.has(expectedNum)) {
                return true
            }
            map.add(arr[i])
        }
        
        return false
    }

// 2) Two pointer algo for sorted input
twoSum(arr, target) {
        const n = arr.length
        if (n <= 1) {
            return false
        }
        arr.sort((a,b) => a - b) // sort if not sorted
        
        let i = 0, j = n - 1
        while (i < j) {
            const sum = arr[i] + arr[j]
            if (sum === target) {
                return true
            }
            
            if (sum < target) {
                i++
            } else {
                j--
            }
        }
        
        return false
    }
