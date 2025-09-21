// https://www.geeksforgeeks.org/next-smaller-element/
// https://www.geeksforgeeks.org/find-the-nearest-smaller-numbers-on-left-side-in-an-array/

// smallest number on right
function nextSmallerEle(arr) {
    let n = arr.length;

    let result = new Array(n).fill(-1);

    let st = [];

    // traverse the array from right to left
    for (let i = n - 1; i >= 0; i--) {

        // pop elements from stack which are >= current element
        while (st.length > 0 && st[st.length - 1] >= arr[i]) {
            st.pop();
        }

        // if stack is not empty, top element is NSE
        if (st.length > 0) {
            result[i] = st[st.length - 1];
        }

        // push current element onto stack
        st.push(arr[i]);
    }

    return result;
}


// smallest number on left
class Solution {
    leftSmaller(arr, n) {
      //code here
      let stk = []
      let res = new Array(n).fill(-1)
      for(let i = 0; i < arr.length; i++) { // iterate from start
          
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