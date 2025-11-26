// https://www.geeksforgeeks.org/move-zeroes-front-linked-list/

function moveZeroes(head) {
    // your code here
    let temp = head.next, prev = head

    while (temp) { // we start from head.next, since if head is 0, it will remain same and if it's not 0 as well, it will remain the same
        if (temp.data === 0) {
            let curr = temp
            temp = temp.next
            prev.next = temp // prev will be updated in the else block only when it's not 0, so we will keep updating the next of the same prev if all are 0

            curr.next = head // move the 0 to the head
            head = curr
        } else {
            prev = temp
            temp = temp.next
        }
    }

    return head
}


function moveZeroes(head) {
    // your code here
    let p1 = null
    let p2 = null
    let head2 = null, head1 = null
    let curr = head

    while (curr) {
        const node = new Node(curr.data)
        if (curr.data === 0) {
            if (!head1) {
                head1 = node
            } else {
                p1.next = node
            }
            p1 = node
        } else {
            if (!head2) {
                head2 = node
            }
            else {
                p2.next = node

            }
            p2 = node
        }
        curr = curr.next
    }
    if (!head1) {
        return head
    }
    p1.next = head2
    return head1
}
