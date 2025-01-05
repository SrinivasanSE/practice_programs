// https://www.geeksforgeeks.org/find-a-triplet-in-an-array-whose-sum-is-closest-to-a-given-number/


closest3Sum(arr, target) {
        const n = arr.length
        let res;
        let diff = Infinity
        
        arr.sort((a, b) => a - b)
        
        for(let i = 0; i < n - 2; i++) {
            
            let l = i + 1
            let r = n - 1
            
            while (l < r) {
                const sum = arr[i] + arr[l] + arr[r]
                const currDiff = Math.abs(target - sum)
                //console.log(sum, currDiff, res, diff)
                if (currDiff < diff) {
                    diff = currDiff
                    res = sum
                } else if (currDiff === diff) {
                    res = Math.max(res, sum)
                }
                
                if (sum < target) {
                    l++
                } else {
                    r--
                }
            }
        }
        
        return res
    }
