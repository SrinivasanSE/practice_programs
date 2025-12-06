
// https://www.geeksforgeeks.org/maximum-sum-of-smallest-and-second-smallest-in-an-array/


/*

To understand the concept with examples, let's break down the reasoning and apply it to specific cases.

### Concept Explanation
The idea is to find the maximum sum of the smallest and second smallest elements in an array by focusing on their positions relative to each other. The reasoning involves analyzing possible subarrays and using logical deductions to determine the optimal pair.

### Case Analysis with Examples

#### Case 1: One Element Between x and y

- **Scenario**: If there is one element $$ z $$ between $$ x $$ and $$ y $$, then the subarray containing $$ \max(x, y) $$ and $$ z $$ should be considered because:
  $$
  \max(x, y) + z \geq x + y
  $$
  This means the sum of the larger of $$ x $$ or $$ y $$ with $$ z $$ is greater than or equal to the sum of $$ x $$ and $$ y $$.

**Example**:
Consider the array: `[3, 1, 4, 2]`

- Identify $$ x = 1 $$ and $$ y = 2 $$.
- There is one element $$ z = 4 $$ between them.
- Evaluate the sum: $$ \max(1, 2) + 4 = 6 $$ which is greater than $$ 1 + 2 = 3 $$.

Thus, the maximum sum involving these elements is achieved with the pair $$ (2, 4) $$ rather than $$ (1, 2) $$.

#### Case 2: More Than One Element Between x and y

- **Scenario**: If there are multiple elements between $$ x $$ and $$ y $$, then for any consecutive elements $$ Z_i $$ and $$ Z_{i+1} $$ within that subarray:
  $$
  Z_i + Z_{i+1} \geq x + y
  $$
  This implies that the sum of any consecutive pair within the subarray is greater than or equal to $$ x + y $$, meaning $$ (x, y) $$ cannot be the optimal pair.

**Example**:
Consider the array: `[5, 1, 3, 4, 2]`

- Identify $$ x = 1 $$ and $$ y = 2 $$.
- Elements between them are $$ 3 $$ and $$ 4 $$.
- Evaluate possible sums:
  - $$ 3 + 4 = 7 $$
  - $$ 1 + 2 = 3 $$

Here, the sum of consecutive elements $$ (3, 4) $$ is greater than $$ (1, 2) $$, confirming that $$ (1, 2) $$ is not the optimal pair.

### Conclusion
By analyzing the structure of the array and the positions of $$ x $$ and $$ y $$, we can deduce that the optimal pair for the maximum sum of the smallest and second smallest elements must be consecutive. 
This approach efficiently narrows down the search space and ensures that the solution is optimal.

*/


class Solution {
    // Function to find a pair with maximum sum in the given array.
    pairWithMaxSum(arr) {
        // your code here
        let res = 0
        let stack = [arr[0]]
        for(let i = 1; i < arr.length; i++) {
            res = Math.max(res, arr[i] + stack[stack.length - 1])
            stack.push(arr[i])
        }
        
        return res
    }
}


class Solution {
    // Function to find a pair with maximum sum in the given array.
    pairWithMaxSum(arr) {
        // your code here
        let res = 0
        let s1 = Infinity
        let s2 = Infinity
        
        for(let i = 0; i < arr.length; i++) {
            s1 = Infinity
            s2 = Infinity
            for(let j = i; j < arr.length; j++) {
                if (arr[j] < s1) {
                    s2 = s1
                    s1 = arr[j]
                } else if (arr[j] < s2) {
                    s2 = arr[j]
                }
                if(s1 != Infinity && s2 != Infinity)
                    res = Math.max(res, s1 + s2)
            }
        }
        
        return res
    }
}