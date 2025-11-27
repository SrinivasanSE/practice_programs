// https://www.geeksforgeeks.org/find-sum-last-n-nodes-given-linked-list/

/*
Maintain two pointers – reference pointer and main pointer. Initialize both reference and main pointers to head. 
First, move reference pointer to n nodes from head and while traversing accumulate node’s data to some variable, say sum. 

Now move both pointers simultaneously until the reference pointer reaches the end of the list and 
while traversing accumulate all node’s data to sum pointed by the reference pointer and accumulate all node’s data to some variable, 
say, temp, pointed by the main pointer. Now, (sum – temp) is the required sum of the last n nodes.
*/

// Similar to Kth from end of linked list
O(n) & O(1)
class Solution {

    sumOfLastN_Nodes(head, n) {
        // code here
        let ref = head
        let main = head

        let sum = 0
        let temp = 0

        while (n) {
            n--
            sum += ref.data
            ref = ref.next
        }

        while (ref) {
            sum += ref.data
            temp += main.data
            ref = ref.next
            main = main.next
        }

        return sum - temp // sum will contain all the nodes value and temp will contain the sum of the nodes till n, so sum - temp will give the last n nodes data
    }
}


class Solution {

    reverse(head) {
        let curr = head
        let nxt
        let prev = null
        while (curr) {
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt
        }

        return prev
    }
    sumOfLastN_Nodes(head, n) {
        // code here
        head = this.reverse(head)

        let i = 0
        let sum = 0
        while (i < n) {
            sum += head.data
            i++
            head = head.next
        }

        return sum
    }
}
