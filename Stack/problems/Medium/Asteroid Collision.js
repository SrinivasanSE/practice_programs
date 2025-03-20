// https://www.geeksforgeeks.org/reduce-array-by-replacing-adjacent-opposite-sign-pairs-with-their-absolute-maximum/


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
                if (Math.abs(ele) > stk[stk.length - 1]) {
                    stk.pop()
                } else if (Math.abs(ele) === stk[stk.length - 1]) {
                    flag = 0
                    stk.pop()
                    break
                } else {
                    flag = 0
                    break
                }
            }
            if (flag) {
                stk.push(ele)
            }
        }
        
        return stk
    }
}