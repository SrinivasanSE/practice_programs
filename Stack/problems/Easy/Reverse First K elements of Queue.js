// https://www.geeksforgeeks.org/reversing-first-k-elements-queue/

class Solution {
    // Function to reverse first k elements of a queue.
    modifyQueue(q, k) {
        // your code here
        let s = []
        let i = 0
        while (i < k) {
            s.push(q.pop())
            i++
        }
        
        while(i--) {
            q.push(s.pop())
        }
        const n = q.arr.length - q.front // q.size()
        while (k < n) {
            q.push(q.pop())
            k++
        }
        
        return q
        
    }
}