// https://www.geeksforgeeks.org/reduce-array-by-replacing-adjacent-opposite-sign-pairs-with-their-absolute-maximum/
// https://leetcode.com/problems/asteroid-collision/

/*

O(2n) & O(n) at most will push n elements to the stack and pop it, so while loop will run only n times in total

*/


class Solution {
    //Function to find out the remaining asteroids.
    asteroidCollision(N, a)
    {
        //your code here
        let stk = []
        let flag
        for(let ele of a) {
            flag = 1
            while(stk.length > 0 && stk[stk.length - 1] > 0 && ele < 0) {  
                if (Math.abs(ele) > stk[stk.length - 1]) { // The negative asteroid is bigger, so it will destroy the stack top
                    stk.pop()
                } else if (Math.abs(ele) === stk[stk.length - 1]) { // Both are in same size, so both will be destroyed, we can pop the stack and set the flag as 0, so that we don't push this asteroid to the stk
                    flag = 0
                    stk.pop()
                    break // break
                } else { // The negative asteroid is small in size, so it will be destroyed and no need to add in the stack
                    flag = 0
                    break // break
                }
            }
            if (flag) { // add the asteroid only if the flag is 1
                stk.push(ele)
            }
        }
        
        return stk
    }
}