// https://www.geeksforgeeks.org/dsa/smallest-difference-triplet-from-three-arrays/

function smallestDifferenceTriplet(arr1, arr2, arr3) {
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
            
            if (min === arr1[i]) { // To potentially reduce the difference further, move the pointer that points to the current minimum value forward (since the arrays are sorted, the next value will be larger).
                i++
            } else if (min === arr2[j]) {
                j++
            } else {
                k++
            }
        }
        
        return res
    }
