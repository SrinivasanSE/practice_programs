// https://www.geeksforgeeks.org/find-triplets-array-whose-sum-equal-zero/
// https://www.geeksforgeeks.org/print-all-triplets-with-given-sum/


  findTriplets(arr) {
        const res = []
        const n = arr.length
        const map = new Map()
        
        for(let i = 0; i < n; i++) {
            if(!map.has(arr[i])) {
                map.set(arr[i], [])
            }
            
            map.get(arr[i]).push(i)
        }
        
        for(let i = 0; i < n - 1; i++) {
            for(let j = i + 1; j < n; j++) {
                const sum = arr[i] + arr[j]
                const reqNum = -sum
                if(map.has(reqNum)) {
                    const pairs = map.get(reqNum)
                    for(let k of pairs) {
                        if (k != i && k != j && i < j && j < k) {
                            res.push([i, j, k])
                        }
                    }
                }
            }
        }
        
        return res
    }
