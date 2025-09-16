// https://www.geeksforgeeks.org/check-whether-given-number-even-odd/


class Solution {
    isEven(n) {
        // code here
        return (n & 1) === 0
        
    }
}

/*

n = 4 

100 & 001 will be 0
101 & 001 will be 1 because for odd integer, the last bit will be always set, so the output will be 1 always if it's odd

*/