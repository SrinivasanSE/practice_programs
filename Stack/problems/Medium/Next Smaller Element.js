// https://www.geeksforgeeks.org/next-smaller-element/
// https://www.geeksforgeeks.org/find-the-nearest-smaller-numbers-on-left-side-in-an-array/

// smallest number on right
class Solution{
    help_classmate(arr,n){
        //code here
        let stack = []; 
        let result = new Array(n).fill(-1);
        
        for (let i = 0; i < n; i++) { 
            if (stack.length == 0) { 
                stack.push(i); 
                continue; 
            } 
            while (stack.length > 0 && arr[stack[stack.length-1]] > arr[i]) { 
                result[stack[stack.length-1]] = arr[i];
                stack.pop(); 
            } 
            stack.push(i); 
        } 
        return result;
    }
}

// smallest number on left
class Solution {
    leftSmaller(arr, n) {
      //code here
      let stk = []
      let res = new Array(n).fill(-1)
      for(let i = 0; i < arr.length; i++) {
          
          while(stk.length > 0 && stk[stk.length - 1] >= arr[i]) {
              stk.pop()
          }
          
          if (stk.length) {
              res[i] = stk[stk.length - 1]
          }
          
          stk.push(arr[i])
      }
      
      return res
    }
  }