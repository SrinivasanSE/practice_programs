// https://leetcode.com/problems/count-pairs-whose-sum-is-less-than-target/

var countPairs = function(nums, target) {
    let count = 0
    nums.sort((a, b) => a - b)
    const n = nums.length
    let i = 0, j = n - 1
    while (i < j) {
        let sum = nums[i] + nums[j]
        if (sum < target) {
            count += (j - i) // if the element at i and j is less than the target, then for ex, index 0, 4. 0 + 4, 0 + 3, 0 + 2, 0 + 1 will also be less than the target
            i++
        }
        else {
            j--
        }
    }

    return count
};

function binarySearch(arr, complement) {
    let lo = 0, hi = arr.length - 1;
    let res = arr.length;

    while (lo <= hi) {
        let mid = Math.floor((lo + hi) / 2);

        if (arr[mid] >= complement) {
            res = mid;
            hi = mid - 1;
        } 
        else {
            lo = mid + 1;
        }
    }
    return res;
}

function countPairs(arr, target) {
    let cnt = 0;

    // Sort the array to use binary search
    arr.sort((a, b) => a - b);

    for (let i = 0; i < arr.length; i++) {
        let complement = target - arr[i];

        // Index of the element which is greater 
        // or equal to the complement
        let ind = binarySearch(arr, complement);

        // arr[i] will make valid pairs with  
        // each element before the index 'ind'
        cnt += ind;

        // If element has made a pair with itself
        if (ind > i)
            cnt--;
    }

    // Each pair is counted twice
    return Math.floor(cnt / 2);
}



https://www.geeksforgeeks.org/problems/valid-pair-sum--141631/1?page=1&category=Searching&difficulty=Medium&sortBy=submissions

ValidPair(arr,n){
        
        //code here
        let count = 0
        arr.sort((a, b) => a - b)
        let l = 0, r = n - 1
        //console.log(arr)
        while (l < r) {
            const sum = arr[l] + arr[r]
            if (sum > 0) {
                count += (r - l)
                r--
            } else {
                l++
            }
        }
        
        return count
        
    }
