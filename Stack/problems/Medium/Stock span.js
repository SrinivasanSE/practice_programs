// https://www.geeksforgeeks.org/the-stock-span-problem/

class Solution {
    calculateSpan(arr) {
        // write code here
        let stack = []
        let res = []
        let top = -1
        
        for(let i = 0; i < arr.length; i++) {
            let count = 1
            let temp = top
            while (top >= 0 && stack[top] <= arr[i]) {
                count++
                top--
            }
            top = temp
            res[i] = count
            stack.push(arr[i])
            top++
        }
        //console.log(res)
        return res
    }
}


// efficient sol
class Solution {
    calculateSpan(arr) {
        // write code here
        let stack = [] // will contain the index of the elements
        let res = []
        let top = -1
        
        for(let i = 0; i < arr.length; i++) {
            while (top >= 0 && arr[stack[top]] <= arr[i]) {
                stack.pop()
                top--
            }
            if (top < 0) { // If stack is empty, all elements to the left are smaller. Else, top of the stack is the last greater element's index
                res.push(i + 1)
            } else {
                res.push(i - stack[top])  // 
            }
            stack.push(i)
            top++
        }
        //console.log(res)
        return res
    }
}










/*
Example Walkthrough
Let's go through an example step by step to understand the flow:

Input:
javascript
Copy
let arr = [ 10, 4, 5, 90, 120, 80 ];
Process Each Day:
Day 0: Price = 10
Stack is empty: The span is 1 because there's no previous day to compare.
Span: [1, _, _, _, _, _]
Stack: [0] (we push the index 0)
Day 1: Price = 4
Stack top: Price at index 0 is 10, which is greater than 4. So, we leave the stack as it is.
Span: [1, 1, _, _, _, _] (The span for day 1 is 1 since there's no previous day with a higher price than 4)
Stack: [0, 1] (we push the index 1)
Day 2: Price = 5
Stack top: Price at index 1 is 4, which is less than 5, so we pop it from the stack.
Stack top: Price at index 0 is 10, which is greater than 5, so we stop popping.
Span: [1, 1, 2, _, _, _] (The span for day 2 is 2 because day 2's price (5) is greater than day 1's price (4), and the next price lower than 5 is on day 0).
Stack: [0, 2] (we push the index 2)
Day 3: Price = 90
Stack top: Price at index 2 is 5, which is less than 90, so we pop it from the stack.
Stack top: Price at index 0 is 10, which is less than 90, so we pop it from the stack.
Stack is empty: The span is 4 because all previous prices were smaller than 90, so the span is i + 1.
Span: [1, 1, 2, 4, _, _]
Stack: [3] (we push the index 3)
Day 4: Price = 120
Stack top: Price at index 3 is 90, which is less than 120, so we pop it from the stack.
Stack is empty: The span is 5 because all previous prices were smaller than 120, so the span is i + 1.
Span: [1, 1, 2, 4, 5, _]
Stack: [4] (we push the index 4)
Day 5: Price = 80
Stack top: Price at index 4 is 120, which is greater than 80. So, we don't pop and calculate the span.
Span: [1, 1, 2, 4, 5, 1] (The span is 1 because the last price greater than 80 is 120 at day 4, so the span is 5 - 4 = 1).
Stack: [4, 5] (we push the index 5)
Final Result:
The final span array is:

javascript
Copy
[1, 1, 2, 4, 5, 1]
Summary of Span Values:
Day 0: 10 → Span: 1
Day 1: 4 → Span: 1
Day 2: 5 → Span: 2
Day 3: 90 → Span: 4
Day 4: 120 → Span: 5
Day 5: 80 → Span: 1
Time Complexity:
The algorithm runs in O(n) time where n is the number of days. This is because each element is pushed and popped from the stack at most once.
Space Complexity:
The space complexity is O(n), as we use two arrays of size n: span for storing the span values and stk for storing the indices of the prices.

*/