// https://www.geeksforgeeks.org/count-set-bits-in-an-integer/


/*

Brute

*/

class Solution {

    setBits(n) {
        // your code here
        let count = 0
        
        while (n > 0) {
            count += (n % 2) // we count the bits while converting to binary
            n = Math.floor(n/2)
        }

        return count
    }
}

/*

Optimal - Bit

*/


class Solution {

    setBits(n) {
        // your code here
        let count = 0
        
        while (n != 0) {
            count += (n & 1) // we count the number of 1 bits and move the bits to right 
            n = n >> 1 // equivalent to n/2
        }
        
        return count
    }
}

class Solution {

    setBits(n) {
        // your code here
        let count = 0
        
        while (n != 0) {
            n = (n & n - 1) // in each iteration, 1 will be removed and become all 0s
            count++
        }

        return count
    }
}