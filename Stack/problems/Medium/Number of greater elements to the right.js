// https://www.geeksforgeeks.org/problems/number-of-nges-to-the-right/1'

// check for other optimised approaches

class Solution {
    count_NGE(arr, indices) {
        // code here
        let hashmap = {}, count = 0
        
        const n = arr.length
        
        for (let i = 0; i < n; i++) {
            count = 0
            for (let j = i + 1; j < n; j++) {
                if (arr[i] < arr[j]) {
                    count++
                }
            }
            hashmap[i] = count
        }
        
        let ans = []
        for(let index of indices) {
            ans.push(hashmap[index])
        }
        
        return ans
    }
}