// https://leetcode.com/problems/linked-list-cycle/description/

// Brute - Using hashmap

function detectLoop(head) {
    // Initialize a pointer 'temp'
    // at the head of the linked list
    let temp = head;

    // Create a map to keep track of encountered nodes
    const nodeMap = new Map();

    // Step 2: Traverse the linked list
    while (temp !== null) {
        // If the node is already in
        // the map, there is a loop
        if (nodeMap.has(temp)) {
            return true;
        }
        // Store the current node in the map
        nodeMap.set(temp, true);
        // Move to the next node
        temp = temp.next;
    }

    // Step 3: If the list is successfully
    // traversed without a loop, return false
    return false;
}


// Optimal - Using two pointers

var hasCycle = function(head) {
    let slow = head
    let fast = head

    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next.next

        if (slow === fast) return true
    }

    return false
};