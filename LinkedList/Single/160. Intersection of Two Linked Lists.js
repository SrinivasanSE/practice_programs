// https://leetcode.com/problems/intersection-of-two-linked-lists/description/


/*
Brute force - use hashmap

*/

/*
Better 

*/

const collision = (node1, node2, d) => {
    while (d) {
        d--
        node2 = node2.next
    }

    while (node1 != node2) {
        

        node1 = node1.next
        node2 = node2.next
    }

    return node1
}
var getIntersectionNode = function(headA, headB) {
    let temp1 = headA, temp2 = headB

    let n1 = 0, n2 = 0

    while (temp1) {
        n1++
        temp1 = temp1.next
    }

    while (temp2) {
        n2++
        temp2 = temp2.next
    }

    if (n1 < n2) {
        return collision(headA, headB, n2 - n1) // we move the larger node by the distance d, they should be at same distance from the intersection point now
    }
    return collision(headB, headA, n1 - n2)

};

/*
Optimal


*/

var getIntersectionNode = function(headA, headB) {
    let temp1 = headA, temp2 = headB

    while (temp1 != temp2) {
        temp1 = temp1.next
        temp2 = temp2.next

        if (temp1 === temp2) return temp1

        if (temp1 === null) temp1 = headB // we switch the nodes when it's null, so the distance between them becomes adjusted
        if (temp2 === null) temp2 = headA
    }

    return temp1
};