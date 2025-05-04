// https://www.geeksforgeeks.org/find-pairs-given-sum-doubly-linked-list/


class Solution {
    // Function to find pairs in the linked list with the given sum
    findPairsWithGivenSum(head, target) {
        // code here
        let rear = head
        while (rear && rear.next != null) {
            rear = rear.next
        }
        let curr = head
        let ans = []
        while (curr != rear && rear.next != curr) {
            let sum = curr.data + rear.data
            if (sum === target) {
                ans.push([curr.data, rear.data])
                curr = curr.next
                rear = rear.prev
            } else if (sum < target) {
                curr = curr.next
            } else {
                rear = rear.prev
            }
        }
        
        return ans
    }
}