// https://www.geeksforgeeks.org/problems/delete-middle-element-of-a-stack--111318/1?page=2&category=Stack&difficulty=Easy&sortBy=submissions

class Solution {
  deleteMid(s) {
    // code here
    let temp = [];

    const mid = Math.floor(s.length / 2);
    let i = 0;

    while (i < mid) {
      temp.push(s.pop());
      i++;
    }

    s.pop();

    while (temp.length != 0) {
      s.push(temp.pop());
    }

    return s;
  }
}

// Using recursion without using additional data structure

class Solution {
  // Function to delete middle element of a stack.
  deleteMid_util(stack, sizeOfStack, current) {
    // If current pointer is half of the size of stack,
    // we are accessing the middle element of the stack.
    if (current === Math.floor(sizeOfStack / 2)) {
      stack.pop();
      return;
    }

    // Storing the top element in a variable and popping it.
    const x = stack.pop();
    current++;

    // Calling the function recursively.
    this.deleteMid_util(stack, sizeOfStack, current);

    // Pushing the elements (except middle element) back
    // into the stack after recursion calls.
    stack.push(x);
  }

  deleteMid(s) {
    this.deleteMid_util(s, s.length, 0);
  }
}
