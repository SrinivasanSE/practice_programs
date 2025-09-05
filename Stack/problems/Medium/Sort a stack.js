// https://www.geeksforgeeks.org/sort-stack-using-temporary-stack/
// https://www.geeksforgeeks.org/problems/sort-a-stack/1

/*
Using temporary stack
This gives the output in descending order, but while printing using pop, it will come in asc form
O(n*n) & O(n)

*/

function sortstack(input) {
    let tmpStack = [];
    while (input.length > 0) {
        // pop out the first element 
        let tmp = input.pop();

        // we want the top of the stack to contain the lower element, since the curr element is greater, we can't push and we need to pop
        while (tmpStack.length > 0 && tmpStack[tmpStack.length - 1] < tmp) {
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

/*
Using Recursion
This sorts in ascending order, pop output is in descending order
O(n*n) & O(n)
*/
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
        // if current is lower, we can't push it to the top, so we pop the greater element in the top and push the curr element in the correct place and then add the top again, so the greater element remains at the top
        // Remove the top element
        let top = stack.pop();

        // Recursion for the remaining elements in the stack
        this.sortedInsert(stack, current);

        // Insert the popped element back in the stack
        stack.push(top);
    }
}

