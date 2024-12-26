// https://www.geeksforgeeks.org/given-an-array-of-of-size-n-finds-all-the-elements-that-appear-more-than-nk-times/
// https://www.geeksforgeeks.org/boyer-moore-majority-voting-algorithm/


//moore algo
countOccurence(arr, k) {
        if (k < 2) {
            return 0
        }
        const map = new Map()
        let count = 0
        arr.forEach((num) => {
            if (map.has(num)) {
                map.set(num, map.get(num) + 1)
            } else if (map.size < k - 1) {
                map.set(num, 1)
            } else {
                map.forEach((value, key) => {
                    if (value === 1) {
                        map.delete(key)
                    } else {
                        map.set(key, value - 1)
                    }
                })
            }
        })
        
        const actualCount = new Map()
        arr.forEach(num => {
            if (map.has(num)) {
                actualCount.set(num, (actualCount.get(num) || 0) + 1)
            }
        })
        
        actualCount.forEach((value, key) => {
            if (value > Math.floor(arr.length/k)) {
                count+=1
            }
        })
        
        return count
    }

// hashmap method
countOccurence(arr, k) {
        const n = arr.length
        const map = new Map()
        const requiredCount = Math.floor(n/k)
        let count = 0
        for(let i = 0; i < n; i++ ) {
            if(!map.has(arr[i])) {
                map.set(arr[i], 1)
            } else {
                map.set(arr[i], map.get(arr[i]) + 1)
            }
            
            
            
            
        }
        
        map.forEach((value, key) => {
            if (value > requiredCount) {
                count++
            }
        })
        
        //console.log(map, requiredCount)
        
        return count
    }
