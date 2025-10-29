// https://leetcode.com/problems/single-number-iii/description/

/*

Brute

O(nlogn) & O(1)

*/

class Solution {
    twoOddNum(arr) {
        // code here
        let res = []
        
        arr.sort((a, b) => a - b) // sort the arr
        
        let i = 0, val, n = arr.length, count = 0
        
        while (i < n) {
            val = arr[i]
            count = 0
            while (i < n && val === arr[i] ) { // count the no of elements
                i++
                count++
            }
            
            if (count % 2 === 1) {
                res.push(val)
            }
        }
        
        if (res[0] < res[1] ) { // if needed to return in sorted order desc
            [res[0], res[1]] = [res[1], res[0]]
        }
        
        return res
    }
}


/*

Better

O(n) & O(n)

*/

class Solution {
    twoOddNum(arr) {
        // code here
        const map = new Map()
        
        for(let num of arr ) {
            map.set(num, (map.get(num) || 0) + 1)
        }
        
        const res = []
        
        for (let [key, value] of map) {
            if (value & 1) { // checking if the count is odd
                res.push(key)
            }
        }
        
        return res
    }
}


/*

Optimal

O(n) & O(1)

*/

var singleNumber = function (nums) {
    let xor = 0

    for (let num of nums) { // do xor of all the numbers, now it will contain only the xor of two single numbers
        xor ^= num
    }

    // const rightMostBit = (xor & (xor - 1)) ^ xor
    const rightMostBit = xor & -xor // the two numbers will differ by atleast 1 bit for sure, since the two nums will be distinct, if the nums are 14 and 4
    // 14 - 1110 4 - 0100 , xor = 1010, we can see at least two bits are different, we need to find the rightmost bit which has 1, so that we can split the numbers into two buckets
    // rightMostBit = 0010
    let b1 = 0, b2 = 0

    for (let num of nums) {
        if (num & rightMostBit) b1 ^= num // split the numbers into two buckets, definitely both the single numbers will go into separate buckets 
        // as they differ in the rightmost bit, 14 (1110) & (0010) = 1, so 14 will go to b1, 4 (0100) & (0010) = 0, so it will go to b2 and all the other numbers will go to b1 or b2 and cancel out each other, 
        // same numbers will go to same bucket only
        else b2 ^= num
    }

    return [b1, b2]
};


