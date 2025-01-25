// https://www.geeksforgeeks.org/find-triplets-array-whose-sum-equal-zero/


// sorting O(n^2) & O(1)
class Solution {
    // Function to find triplets with zero sum.
    findTriplets(arr) {
       let n = arr.length
       arr.sort((a, b) =>  a - b)
       
       for(let i = 0; i < n - 2; i++) {
           let l = i + 1
           let r = n - 1
           
           while (l < r) {
               const currSum = arr[i] + arr[l] + arr[r]
               
               if (currSum === 0) {
                   return true
               }
               
               if (currSum < 0) {
                   l++
               } else {
                   r--
               }
           }
       }
       
       return false
    }
}


// hashing - O(n ^2) & O(n)
findTriplets(arr) {
       let n = arr.length
       const map = new Map()
       const target = 0
       for(let i = 0; i < n - 2; i++) {
           for(let j = i + 1; j < n; j++) {
               const requiredNum = target - (arr[i] + arr[j])
               //console.log(requiredNum, arr[i], arr[j])
               if(map.has(requiredNum) && map.get(requiredNum) != i && map.get(requiredNum) != j) {
                   return true
               }
               map.set(arr[j], j)
           }
       }
       
       //console.log(map)
       
       return false
    }
