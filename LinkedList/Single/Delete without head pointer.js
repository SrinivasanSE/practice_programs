// https://www.geeksforgeeks.org/delete-a-node-from-linked-list-without-head-pointer/

class Solution {
    deleteNode(node) {
        // your code here
        node.data = node.next.data
        node.next = node.next.next
    }
}
