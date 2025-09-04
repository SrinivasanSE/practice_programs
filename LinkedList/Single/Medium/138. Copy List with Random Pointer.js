// https://leetcode.com/problems/copy-list-with-random-pointer/description/


/*

Brute - using hashmap
O(2n) & O(n) + O(n) 
*/


var copyRandomList = function(head) {
    const hashmap = new Map()
    let curr = head
    while (curr) {
        const newNode = new _Node(curr.val)
        hashmap.set(curr, newNode)
        curr = curr.next
    }

    curr = head
    while (curr) {
        let nextNode = hashmap.get(curr)
        nextNode.next = hashmap.get(curr.next) || null
        nextNode.random = hashmap.get(curr.random) || null
        curr = curr.next
    }
    return hashmap.get(head)

};


/*

Optimal 
O(3n) & O(n)

*/


var copyRandomList = function(head) {
    
    let curr = head
    while (curr) { // To create the copy node and link 
        let newNode = new _Node(curr.val)
        newNode.next = curr.next
        curr.next = newNode
        curr = curr.next.next
    }

    curr = head

    while (curr) { // to link the random pointer
        let copyNode = curr.next
        if (curr.random)
            copyNode.random = curr.random.next
        else
            copyNode.random = null
        curr = curr.next.next
    }
    let dummy = new _Node(-1)

    let res = dummy
    curr = head
    while (curr) { // to link the next pointer res
        res.next = curr.next
        curr.next = curr.next.next
        res = res.next
        curr = curr.next
    }

    return dummy.next

};