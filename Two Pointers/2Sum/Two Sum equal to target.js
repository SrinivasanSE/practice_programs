// https://www.geeksforgeeks.org/check-if-pair-with-given-sum-exists-in-array/

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
