// https://www.geeksforgeeks.org/container-with-most-water/


class Solution {
    maxWater(arr) {
        // code here
        const n = arr.length
        let l = 0
        let r = n - 1
        let res = 0
        if (n <=1) {
            return res
        }
        
        while ( l < r) {
            res = Math.max(res, Math.min(arr[l], arr[r])*(r - l))
            //console.log(res, arr[l], arr[r])
            if (arr[l] < arr[r]) {
                l++
            } else {
                r--
            }
        }
        
        return res
    }
}

function maxWater(arr) {
    let n = arr.length;
    let res = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          
            // Calculate the amount of water
            let amount = Math.min(arr[i], arr[j]) * (j - i);
          
            // Keep track of maximum amount of water
            res = Math.max(amount, res);
        }
    }
    return res;
}