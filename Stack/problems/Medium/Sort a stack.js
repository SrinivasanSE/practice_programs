// https://www.geeksforgeeks.org/sort-stack-using-temporary-stack/


function sortstack(input)
    {
        let tmpStack = [];
        while (input.length > 0)
        {
            // pop out the first element 
            let tmp = input.pop();

            // while temporary stack is not empty and 
            // top of stack is lesser than temp 
            while (tmpStack.length > 0 && tmpStack[tmpStack.length - 1] < tmp)
            {
                // pop from temporary stack and 
                // push it to the input stack 
                input.push(tmpStack[tmpStack.length - 1]);
                tmpStack.pop()
            }

            // push temp in temporary of stack 
            tmpStack.push(tmp);
        }
        return tmpStack;
    }


    class GfG {
        // Function to sort the stack
        sort(s) {
            // Base case: If stack is empty, return the stack
            if (s.length === 0) {
                return s;
            }
    
            // Remove the top element
            let top = s.pop();
    
            // Recursion for the remaining elements in the stack
            this.sort(s);
    
            // Insert the popped element back in the sorted stack
            this.sortedInsert(s, top);
    
            return s;
        }
    
        // Function to insert an element into the sorted stack
        sortedInsert(stack, current) {
            // Base case: If the stack is empty or current is greater than top element, push current
            if (stack.length === 0 || current > stack[stack.length - 1]) {
                stack.push(current);
                return;
            }
    
            // Remove the top element
            let top = stack.pop();
    
            // Recursion for the remaining elements in the stack
            this.sortedInsert(stack, current);
    
            // Insert the popped element back in the stack
            stack.push(top);
        }
    }
    
    