// https://www.geeksforgeeks.org/design-a-stack-that-supports-getmin-in-o1-time-and-o1-extra-space/


class Solution
{
    
    /**
     * @param {number} arr
     * @param {number} n
     * @returns {Stack}
    */
    //Function to push all the elements into the stack.
    _push(arr, n)
    {
        //your code here
        const s = []

        for(let i = 0; i < arr.length; i++) {
            if(i === 0) {
                s.push(arr[i])
            } else {
                s.push(Math.min(s.slice(-1), arr[i]))
            }
        }
        //console.log(s)
        return s
        
    }
    
    /**
     * @param {Stack} s
    */
    //Function to print minimum value in stack each time while popping.
    _getMinAtPop(s)
    {
        //your code here
        let arr = []
        
        while(s.length != 0) {
            arr.push(s.pop())
        }
        console.log(arr.join(" "))
    }
    
}


// JavaScript program to implement a stack that supports
// all operations in O(1) time and O(1) extra space.

class SpecialStack {
    constructor() {
        this.s = [];
        this.minEle = -1;
    }

    // Add an element to the top of Stack
    push(x) {
        if(this.s.length === 0) {
            this.s.push(x)
            this.minEle = x
        } else if (x < this.minEle) {
            this.s.push(2*x - this.minEle)
            this.minEle = x
        } else {
            this.s.push(x)
        }
    }

    // Remove the top element from the Stack
    pop() {
        if(this.s.length === 0) {
            return
        }
        
        const top = this.s.pop()
        
        if (top < this.minEle) {
            this.minEle = 2*this.minEle - top
        }
    }

    // Returns top element of Stack
    peek() {
        if (this.s.length === 0) {
            return -1;
        }

        let top = this.s[this.s.length - 1];

        // If minEle > top means minEle stores value of top.
        return this.minEle > top ? this.minEle : top;
    }

    // Finds minimum element of Stack
    getMin() {
        if (this.s.length === 0) {
            return -1;
        }

        // variable minEle stores the minimum element
        // in the stack.
        return this.minEle;
    }
}

// Driver Code
let ss = new SpecialStack();
ss.push(2);
ss.push(3);
console.log(ss.peek(), " ");
ss.pop();
console.log(ss.getMin(), " ");
ss.push(1);
console.log(ss.getMin(), " ");


/*
The encoding and decoding mechanism in the `SpecialStack` is a clever trick that allows the stack to keep track of the minimum element without using additional space. Let's break down how this works:

### Encoding Mechanism

When a new element `x` is pushed onto the stack and `x` is less than the current minimum element (`minEle`), the program encodes this new minimum using the formula:

$$ \text{encoded\_value} = 2 \times x - \text{minEle} $$

- **Purpose**: This encoded value is pushed onto the stack instead of `x`. It serves two purposes:
  1. It indicates that the current top of the stack represents a new minimum element.
  2. It stores information that can be used to retrieve the previous minimum element when this encoded value is popped.

- **Updating `minEle`**: After pushing the encoded value, `minEle` is updated to `x`, the new minimum.

### Decoding Mechanism

When an element is popped from the stack, the program checks if the popped value is less than the current `minEle`. If it is, this indicates that the popped value is an encoded value, and the previous minimum needs to be restored using the formula:

$$ \text{previous\_minEle} = 2 \times \text{minEle} - \text{encoded\_value} $$

- **Purpose**: This formula decodes the previous minimum element from the encoded value.

### Example

Let's illustrate this with an example:

1. **Initial State**: Push `2`.
   - Stack: `[2]`
   - `minEle`: `2`

2. **Push `1`**:
   - `1` is less than `minEle` (`2`), so encode `1` using `2 * 1 - 2 = 0`.
   - Push `0` onto the stack.
   - Stack: `[2, 0]`
   - Update `minEle` to `1`.

3. **Pop**:
   - Pop `0` from the stack.
   - `0` is less than `minEle` (`1`), indicating it's an encoded value.
   - Decode previous `minEle` using `2 * 1 - 0 = 2`.
   - Stack: `[2]`
   - Update `minEle` back to `2`.

### Summary

- **Encoding**: When pushing a new minimum, encode it using `2 * x - minEle` and update `minEle`.
- **Decoding**: When popping an encoded value, decode the previous minimum using `2 * minEle - encoded_value`.

This approach allows the stack to track the minimum element efficiently without using extra space for each element, maintaining constant time complexity for all operations.

Example:

Let's go through a more detailed example with multiple push and pop operations to see how the encoding and decoding mechanism works in the `SpecialStack`.

### Operations

1. **Push 5**:
   - Stack is empty initially.
   - Push `5`.
   - Stack: `[5]`
   - `minEle`: `5`

2. **Push 3**:
   - `3` is less than `minEle` (`5`), so encode `3` using `2 * 3 - 5 = 1`.
   - Push `1` onto the stack.
   - Stack: `[5, 1]`
   - Update `minEle` to `3`.

3. **Push 7**:
   - `7` is greater than `minEle` (`3`), so push `7` directly.
   - Stack: `[5, 1, 7]`
   - `minEle`: `3`

4. **Push 2**:
   - `2` is less than `minEle` (`3`), so encode `2` using `2 * 2 - 3 = 1`.
   - Push `1` onto the stack.
   - Stack: `[5, 1, 7, 1]`
   - Update `minEle` to `2`.

5. **Pop**:
   - Pop `1` from the stack.
   - `1` is less than `minEle` (`2`), indicating it's an encoded value.
   - Decode previous `minEle` using `2 * 2 - 1 = 3`.
   - Stack: `[5, 1, 7]`
   - Update `minEle` back to `3`.

6. **Pop**:
   - Pop `7` from the stack.
   - `7` is greater than `minEle` (`3`), so it's a normal value.
   - Stack: `[5, 1]`
   - `minEle`: `3`

7. **Pop**:
   - Pop `1` from the stack.
   - `1` is less than `minEle` (`3`), indicating it's an encoded value.
   - Decode previous `minEle` using `2 * 3 - 1 = 5`.
   - Stack: `[5]`
   - Update `minEle` back to `5`.

8. **Push 4**:
   - `4` is less than `minEle` (`5`), so encode `4` using `2 * 4 - 5 = 3`.
   - Push `3` onto the stack.
   - Stack: `[5, 3]`
   - Update `minEle` to `4`.

### Final State

- Stack: `[5, 3]`
- `minEle`: `4`

### Summary

- **Encoding**: Whenever a new minimum is pushed, it is encoded using `2 * x - minEle`.
- **Decoding**: When an encoded value is popped, the previous minimum is retrieved using `2 * minEle - encoded_value`.

This example demonstrates how the stack efficiently tracks the minimum element while performing multiple push and pop operations.
*/