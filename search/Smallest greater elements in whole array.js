// https://www.geeksforgeeks.org/smallest-greater-elements-in-whole-array/
// https://www.geeksforgeeks.org/problems/smallest-greater-elements-in-whole-array2751/1?page=2&category=Searching&difficulty=Easy&sortBy=submissions

greaterElement(arr, n)
    {
        const sortedArr = [...arr]
        sortedArr.sort((a, b) => a - b)
        for(let i = 0; i < n; i++) {
            let l = 0
            let r = n - 1
            let minDiff = Infinity
            let res = -10000000
            while (l <= r) {
                const mid = l + Math.floor((r - l)/2)
                const diff = sortedArr[mid] - arr[i]
                //console.log(diff, sortedArr[mid], arr[i], mid)
                if (diff > 0 && diff < minDiff) {
                    res = sortedArr[mid]
                    minDiff = diff
                }
                
                else if (arr[i] >= sortedArr[mid]) {
                    l = mid + 1
                } else {
                    r = mid - 1
                }
                
                //console.log(l, r)
            } 
            arr[i] = res
        }
        
        return arr
    }
