// https://www.geeksforgeeks.org/mean-range-array/


class Solution {
    findMean(arr, q) {
        // code here
        const n = arr.length
        let prefix = new Array(n).fill(0)
        prefix[0] = arr[0]
        
        for(let i = 1; i < n; i++) {
            prefix[i] = prefix[i - 1] + arr[i]
        }
        let res = []
        for(let i = 0; i < q.length; i+=2) {
            const l = q[i]
            const r = q[i + 1]
            let req = 0
            if (l === 0 ) {
                req = prefix[r]
            } else {
                req = prefix[r] - prefix[l - 1]
            }
            
            res.push(Math.floor(req/(r - l + 1)))
        }
        
        return res
    }
}



// Another version

// JavaScript Code to find the mean in an array 
// for each query using Prefix Sum

// Function to compute floor of mean for each query
function findMean(arr, queries) {
    
    let n = arr.length;
    let q = queries.length;
    let prefixSum = new Array(n + 1).fill(0);
    let result = [];

    // Compute prefix sum
    for (let i = 1; i <= n; i++) {
        prefixSum[i] = prefixSum[i - 1] + arr[i - 1];
    }

    // Iterate through each query
    for (let i = 0; i < q; i++) {
        
        // Convert to 0-based index
        let l = queries[i][0] - 1;
        
        // Convert to 0-based index
        let r = queries[i][1] - 1; 
        
        // Calculate sum using prefix sum
        let sum = prefixSum[r + 1] - prefixSum[l];
        let count = (r - l + 1);

        // Store floor of mean in result
        result.push(Math.floor(sum / count));
    }

    return result;
}
