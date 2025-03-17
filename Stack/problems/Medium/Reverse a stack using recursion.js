// https://www.geeksforgeeks.org/reverse-a-stack-using-recursion/
// /Easy/Insert an Element at the Bottom of a Stack.js

/*
Time Complexity: O(n*n) Since we need to call fun() and it recursively call insert_at_bottom which is again calling itself for recursion, hence O(n*n)
Space Complexity: O(1) We need no extra stack for answer , hence O(1), but for recursion calls it needs o(n) auxiliary space.

*/


class Solution {
    //Function to reverse a string.
    
    insertAtBottom(st, n) {
        if(st.length === 0) {
            st.push(n)
            return
        } 
        const top = st.pop()
        this.insertAtBottom(st, n)
        st.push(top)
        
    }
    reverse(st) {
        //your code here
        if(st.length === 0) {
            return
        }
        
        let top = st.pop()
        
        this.reverse(st)
        
        this.insertAtBottom(st, top)
        
    }
}

// using queue, we could use an temp array, but since the stack has to modified in place, we can't use another arr.
// O(n) & O(n)
class Solution {
    reverse(stack) {
        let queue = [];

        // Move elements from stack to queue
        while (stack.length > 0) {
            queue.push(stack.pop());
        }

        // Move elements from queue back to stack
        while (queue.length > 0) {
            stack.push(queue.shift());
        }
    }
}

