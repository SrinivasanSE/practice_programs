// https://www.geeksforgeeks.org/reverse-a-stack-using-recursion/
// https://www.geeksforgeeks.org/program-to-insert-an-element-at-the-bottom-of-a-stack/

/*
Time Complexity: O(n*n) Since we need to call fun() and it recursively call insert_at_bottom which is again calling itself for recursion, hence O(n*n)
Space Complexity: O(1) We need no extra stack for answer , hence O(1), but for recursion calls it needs o(n) auxiliary space.

*/

class Solution {
  //Function to reverse a string.

  insertAtBottom(st, element) {
    if (st.length === 0) {
      st.push(element);
      return;
    }
    const top = st.pop(); // [2, 1] n = 3 -> [2], n = 3, [], 3 -> [3] -> Push 2, [3, 2] -> Push 1 -> [3, 2, 1]
    this.insertAtBottom(st, element); // we pop all the current elements in the stack and push the new element to the bottom and add the previous elements again after that
    st.push(top);
  }
  reverse(st) {
    //your code here
    if (st.length === 0) {
      return;
    }

    let top = st.pop();

    this.reverse(st);

    this.insertAtBottom(st, top);
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
