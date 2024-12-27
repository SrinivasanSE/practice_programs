// https://www.geeksforgeeks.org/count-pairs-with-given-sum/

countPairs(arr, target) {
        const n = arr.length
        let count = 0
        let map = new Map()
        
        for(let i = 0; i < n; i++) {
            const expectedNum = target - arr[i]
            if (map.has(expectedNum)) {
                count += map.get(expectedNum)
            }
            
            map.set(arr[i], (map.get(arr[i]) || 0) + 1)
            
        }
        
        return count
    }
