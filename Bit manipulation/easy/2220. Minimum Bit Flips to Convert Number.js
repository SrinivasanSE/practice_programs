// https://leetcode.com/problems/minimum-bit-flips-to-convert-number/description/

/*

Brute

O(n + m) & O(n + m)
*/



const decimalToBin = (num) => {
    let str = ""
    while (num > 0) {
        str = (num % 2) + str
        num = num >> 1
    }

    return str
}
var minBitFlips = function(start, goal) {
    let bin1 = decimalToBin(start)
    let bin2 = decimalToBin(goal)


    let i = bin1.length - 1, j = bin2.length - 1, count = 0

    while (i >= 0 || j >= 0) {
        let cmp1 = i < 0 ? 0 : bin1[i]
        let cmp2 = j < 0 ? 0 : bin2[j]
        if (cmp1 != cmp2) {
            count++
        }
        i--
        j--
    }

    return count
};

/*

Optimal

Time complexity:
The time complexity is O(k), where k is the number of bits in the binary representation of the larger of the two numbers (start or goal).

*/



var minBitFlips = function(start, goal) {
    // XOR to find differing bits between start and goal
    let xorResult = start ^ goal; // 1010 and 0111 -> 1101
    let ans = 0;
    
    // Count the number of 1's in the XOR result
    while (xorResult > 0) {
        ans += xorResult & 1;  
        xorResult >>= 1;        
    }

    /*
    while (xorResult != 0) {
        xorResult = xorResult & (xorResult - 1)
        count++
    }
        */
    
    return ans;
};