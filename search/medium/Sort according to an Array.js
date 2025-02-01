// https://www.geeksforgeeks.org/sort-array-according-order-defined-another-array/

sortA1ByA2(A1, N, A2, M){
        // code here
        const map = new Map()
        
        for(let i = 0; i < M; i++) {
            const num = A2[i]
            if (!map.has(num)) {
                map.set(num, i + 1)
            }
        }
        
        A1.sort((a, b) => {
            const idx1 = map.get(a) || 0
            const idx2 = map.get(b) || 0
            
            if (idx1 === 0 && idx2 === 0) {
                return a - b
            }
            
            if (idx1 === 0) {
                return 1
            }
            
            if (idx2 === 0) {
                return -1
            }
            
            return idx1 - idx2
        })
        
        return A1
    }
