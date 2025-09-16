// https://www.geeksforgeeks.org/problems/swap-two-numbers3844/1


class Solution {
    get(a, b) {
        // code here
        a = a ^ b
        b = a ^ b // (a ^ b) ^ b
        a = a ^ b // (a ^ b) ^ a
        
        return [a, b]
    }
}