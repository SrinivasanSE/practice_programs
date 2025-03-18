// https://www.geeksforgeeks.org/find-maximum-difference-between-nearest-left-and-right-smaller-elements/


class Solution {
    findMaxDiff(arr) {
        // code here
        let ls = []
        let stk = []
        
        for(let i = 0; i < arr.length; i++) {
            while(stk.length > 0 && stk[stk.length - 1] >= arr[i]) {
                stk.pop()
            }
            if(stk.length === 0) {
                ls[i] = 0
            } else {
                ls[i] = stk[stk.length - 1]
            }
            stk.push(arr[i])
        }
        stk = []
        let max = -1
        let temp = 0
        for(let i = arr.length - 1; i >= 0; i--) {
            while(stk.length > 0 && stk[stk.length - 1] >= arr[i]) {
                stk.pop()
            }
            if(stk.length === 0) {
                temp = Math.abs(ls[i] - 0)
            } else {
                temp = Math.abs(ls[i] - stk[stk.length - 1])
            }
            //console.log(ls[i], temp, arr[i])
            stk.push(arr[i])
            max = Math.max(max, temp)
        }
        
        //console.log(max)
        return max

    }
}
