// https://leetcode.com/problems/koko-eating-bananas/description/

/*
Brute Force 
O(max(a[]) * N) & O(1)
*/


var minEatingSpeed = function(piles, h) {
    const n = piles.length
    let totalHours = 0
    const maxLimit = Math.max(...piles)
    for(let i = 1; i <= maxLimit; i++) {
        totalHours = 0
        for(let j = 0; j < n; j++) {
            totalHours += Math.ceil(piles[j]/i)
        }
        if (totalHours <= h) {
            return i
        }
    }
    return 1 // not needed
};


/*
Optimal - Binary Search
O(N * log(max(a[]))) & O(1)
*/


const getHours = (arr, h, n) => {
    let totalHours = 0
        for(let j = 0; j < n; j++) {
            totalHours += Math.ceil(arr[j]/h)
        }
        return totalHours
}
var minEatingSpeed = function(piles, h) {
    const n = piles.length
    let totalHours = 0
    const maxLimit = Math.max(...piles)
    let l = 1, r  = maxLimit
    while (l <= r) {
        const mid = l + Math.floor((r - l)/2)
        totalHours = getHours(piles, mid, n)
        
        if (totalHours <= h) { // if we get totalhours less than h, that means after mid, hours at the right side will also take less time, so we move to left to find the min value
            r = mid - 1
        } else {
            l = mid + 1
        }
    }

    return l // l will contain the min value
};