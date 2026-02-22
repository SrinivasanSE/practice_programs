// https://www.geeksforgeeks.org/reversing-first-k-elements-queue/

function reverseFirstK(q, k) {
  if (q.length === 0 || k > q.length) return;
  if (k <= 0) return;

  let s = [];

  /* Push the first K elements
       into a Stack*/
  for (let i = 0; i < k; i++) {
    // q = [1,2,3,4,5]
    s.push(q.shift());
  }

  /* Enqueue the contents of stack
       at the back of the queue*/
  while (s.length > 0) {
    // s = [1, 2, 3], q = [4, 5]
    q.push(s.pop());
    // q = [4,5,3,2,1]
  }

  /* Remove the remaining elements and
       enqueue them at the end of the Queue*/
  for (let i = 0; i < q.length - k; i++) {
    // q = [4, 5, 3, 2, 1]
    q.push(q.shift());
    // q = [3,2,1,4,5]
  }
}
