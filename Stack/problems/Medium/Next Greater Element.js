// https://www.geeksforgeeks.org/next-greater-element/
// https://www.geeksforgeeks.org/problems/save-gotham1222/1?page=2&category=Stack&difficulty=Medium&status=unsolved&sortBy=submissions


// Brute force
class Solution {
    // Function to find the next greater element for each element of the array.
    nextLargerElement(arr) {
        // code here
        let n = arr.length;
        let res = new Array(n).fill(-1);
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (arr[j] > arr[i]) {
                    res[i] = arr[j];
                    break;
                }
            }
        }

        return res;
    }
}


/*
Understanding the Stack Operations
The key point here is how many times each element is pushed and popped from the stack. While it might seem that the while loop could lead to quadratic complexity because of repeated popping, it does not result in O(n^2) for the following reason:

Each element is pushed onto the stack once.

In the first loop iteration (from right to left), the element arr[i] is pushed onto the stack.
Each element is popped from the stack at most once.

If an element arr[i] is smaller than or equal to the current element, it gets popped from the stack during the execution of the while loop. But notice, once an element is popped from the stack, it is never pushed back again.

An element can only be popped once, because once it's popped, it doesn't return to the stack in subsequent iterations. Even if an element gets popped multiple times in different iterations, it only counts as one pop for each element across the entire execution of the algorithm.

Why This Avoids O(n²):
Even though there is a while loop inside the for loop, the key observation is that the stack operations (pushes and pops) are distributed across all iterations of the for loop. Every element is pushed once and popped once, which means the total number of stack operations across the entire execution is linear, i.e., O(n).
Breakdown of Stack Operations:
In the worst case:
Each element is pushed onto the stack once (n pushes).
Each element is popped from the stack at most once (n pops).
Thus, there are at most 2n operations (pushing and popping), which simplifies to O(n) time complexity.

Example to Illustrate:
Consider the array [6, 8, 0, 1, 3]:

Initially, the stack is empty.
When processing 3, it's pushed onto the stack.
When processing 1, it's pushed onto the stack.
When processing 0, it's pushed onto the stack.
When processing 8, all elements smaller than 8 (i.e., 3, 1, 0) are popped from the stack.
When processing 6, it’s pushed onto the stack.
Each element is popped at most once, and no element is pushed back to the stack.
Even though the while loop pops multiple elements in one iteration, every element is pushed and popped exactly once, and the total work done across all iterations is proportional to the size of the array.

Conclusion:
So, the overall time complexity of the program is O(n), not O(n²), because every element is pushed and popped from the stack at most once.

Time Complexity Breakdown:
For Loop: The outer for loop runs n times.
While Loop: Each element is pushed onto the stack once and popped from the stack at most once, so the total number of pop operations is O(n).
Therefore, the total time complexity of the program is dominated by the single pass through the array and the stack operations (push/pop), which results in O(n) time complexity.

Final Time Complexity:
O(n), where n is the number of elements in the input array.
*/


// O(n) & O(n)
class Solution {
    // Function to find the next greater element for each element of the array.
    nextLargerElement(arr) {
        // code here
        const n = arr.length
        let res = new Array(n).fill(-1)
        let s = []
        let top = -1
        
        for(let i = n - 1; i >= 0; i--) {
            
            while(top >= 0 && s[top] <= arr[i] ) { // we remove all the smaller elements than the current element, so that the top can contain an element greater than the current element
                s.pop()
                top--
            }
            
            if(top >= 0) {
                res[i] = s[top]
            }
            
            s.push(arr[i])
            top++
        }
        
        return res
        
    }
}