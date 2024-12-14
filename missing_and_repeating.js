//https://www.geeksforgeeks.org/find-a-repeating-and-a-missing-number/


class Solution {
    // Function to find two repeating elements in an array of size n.
    findTwoElement(arr) {
        let res1,res2
        let n = arr.length
        let hashmap = new Array(n + 1).fill(0)
        for(let i = 0; i < n; i++) {
            hashmap[arr[i]]++
            if(hashmap[arr[i]] > 1) {
                res2 = arr[i]
            }
        }
        for(let i = 1; i <=n; i++) {
            if(hashmap[i] === 0) {
                res1 = i
                break
            }     
        }
        
        return [res2, res1]
    }
}

class Solution {
    // Function to find two repeating elements in an array of size n.
    findTwoElement(arr) {
        let repeating
        let n = arr.length
        let sum = n*(n + 1)/2
        for(let i = 0; i < n; i++) {
            const index = Math.abs(arr[i])
            if (arr[index - 1] > 0) {
                arr[index - 1] *= -1
                sum -= index
            } else {
                repeating = index
            }
        }
        
        return [repeating, sum]
    }
}


