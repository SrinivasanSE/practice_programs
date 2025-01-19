// https://www.geeksforgeeks.org/problems/find-the-closest-pair-from-two-arrays4215/1?page=2&category=Searching&difficulty=Easy&sortBy=submissions


printClosest(arr, brr, n, m, x)
    {
        let n1=-1, n2 =-1
        let l = 0
        let r = m - 1
        let minDiff = Infinity
        while (l < n && r >= 0) {
            const sum = arr[l] + brr[r]
            const diff = Math.abs(sum - x)
            
            if (diff < minDiff) {
                minDiff = diff
                n1 = arr[l]
                n2 = brr[r]
            }
            
            if (sum === x) {
                break
            }
            
            if (sum < x) {
                l++
            } else {
                r--
            }
        }
        
        return [n1, n2]
        
        
        
        
    }
