// https://www.geeksforgeeks.org/count-pairs-with-given-sum/
// https://www.geeksforgeeks.org/count-pairs-with-given-sum-in-sorted-array/


// Hashmap for unsorted arr
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

// Two pointer for sorted arr
countPairs(arr, target) {
        arr.sort((a, b) => a - b)
        const n = arr.length
        let l = 0
        let r = n - 1
        let res = 0
        while (l < r) {
            const sum = arr[l] + arr[r]
            
            if (sum < target) {
                l++
            } else if (sum > target) {
                r--
            } else {
                let c1 = 0, c2 = 0
                const left = arr[l]
                const right = arr[r]
                while (l <= r && arr[l] === left) {
                    c1++
                    l++
                }
                
                while (l <= r && arr[r] === right) {
                    c2++
                    r--
                }
                
                if (left === right) {
                    res += c1*(c1 - 1)/2   // nc2 for ex: 4c2
                } else {
                    res += c1*c2
                }
            }
        }
        
        return res
    }


/*
If the elements are the same (ele1 === ele2):

Use the combination formula, for any count cnt of repeated elements:

The number of distinct pairs you can form from them is:
Count of pairs   = cnt1*(cnt1−1)/2

​where cnt1 is the frequency of ele1.
This formula calculates how many ways you can choose 2 elements from cnt1.


If the elements are different (ele1 !== ele2):

The number of pairs is simply cnt1*cnt2
as you pair every occurrence of ele1 with every occurrence of ele2.

*/
