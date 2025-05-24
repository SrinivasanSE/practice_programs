// https://www.geeksforgeeks.org/total-cuts-such-that-sum-of-largest-of-left-and-smallest-of-right-is-atleast-k/

class Solution {
    // Function to count the total number of distinct subsequences.
    totalCuts(N, K, arr) {
        // your code here
        const minRight = new Array(N).fill(0)
        let max = 0
        minRight[N - 1] = arr[N - 1]
        for(let i = N - 2; i >= 0; i--) {
            minRight[i] = Math.min(minRight[i + 1], arr[i])
        }
        
        let count = 0
        for(let i = 0; i < N - 1; i++) {
            max = Math.max(arr[i], max)
            if (max + minRight[i + 1] >= K) {
                count++
            }
        }
        
        return count
    }
}


class Solution {
    // Function to count the total number of distinct subsequences.
    totalCuts(N, K, arr) {
        // your code here
        const maxLeft = new Array(N).fill(0)
        const minRight = new Array(N).fill(0)
        maxLeft[0] = arr[0]
        for(let i = 1; i < N; i++) {
            maxLeft[i] = Math.max(maxLeft[i - 1], arr[i])
        }
        minRight[N - 1] = arr[N - 1]
        for(let i = N - 2; i >= 0; i--) {
            minRight[i] = Math.min(minRight[i + 1], arr[i])
        }
        
        let count = 0
        for(let i = 0; i < N - 1; i++) { // we use N - 1, because the right side arr should contain atleast 1 element
            
            if (maxLeft[i] + minRight[i + 1] >= K) {
                count++
            }
        }
        
        return count
    }
}