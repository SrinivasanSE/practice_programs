// https://www.geeksforgeeks.org/2-sum-pair-sum-closest-to-target/

closestPairSum(arr, target) {
        arr.sort((a, b) => a-b)
        
        const n = arr.length
        if (n === 1) {
            return []
        }
        let i = 0, j = n - 1
        let diff = Infinity
        let res = []
        while ( i < j) {
            let currSum = arr[i] + arr[j]
            let currDiff = Math.abs(target - (arr[i] + arr[j]))
            if (currDiff < diff) {
                diff = currDiff
                res = [arr[i], arr[j]]
            } else if (currDiff === diff) {
                let temp = res[1] - res[0]
                let temp1 = arr[j] - arr[i]
                if (temp < temp1) {
                    res = [arr[i], arr[j]]
                }
            }
            
            if (currSum < target) {
                i++
            } else {
                j--
            }
        }
        
        return res
    }

findClosest(arr, k) {
        const n = arr.length
        
        let l = 0, r = n - 1, mid = 0
        
        while (l <= r) {
            
            mid = l + Math.floor((r - l)/2)
            
            if (arr[mid] === k) {
                return arr[mid]
            }
            
            if (arr[mid] < k) {
                
                if (mid < n -1 && arr[mid + 1] > k) {
                    return this.getClosest(arr[mid], arr[mid + 1], k)
                }
                
                l = mid + 1
            }
            
            else {
                if (mid > 0 && arr[mid - 1] < k) {
                    return this.getClosest(arr[mid - 1], arr[mid], k)
                }
                
                r = mid - 1
            }
            
        }
        
        return arr[mid]
        
        
    }
    
    getClosest(val1, val2, target) {
        if (val2 - target <= target - val1) {
            return val2
        }
        return val1
    }
