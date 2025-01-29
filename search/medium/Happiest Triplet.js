  smallestDifferenceTriplet(arr1, arr2, arr3) {
        // code here
        let diff = Infinity
        let res;
        arr1.sort((a, b) => a - b)
        arr2.sort((a, b) => a - b)
        arr3.sort((a, b) => a - b)
        const n = arr1.length
        let i = 0, j = 0, k = 0
        
        while(i < n && j < n && k < n) {
            const min = Math.min(arr1[i], arr2[j], arr3[k])
            const max = Math.max(arr1[i], arr2[j], arr3[k])
            const sum = arr1[i] + arr2[j] + arr3[k]
            if (max - min < diff) {
                diff = max - min
                res = [max, sum - max - min, min]
            }
            
            if (min === arr1[i]) { // we are checking min to decrease the diff btw max and min, since the next element will be larger than the curr
                i++
            } else if (min === arr2[j]) {
                j++
            } else {
                k++
            }
        }
        
        return res
    }
