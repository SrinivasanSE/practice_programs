// https://www.geeksforgeeks.org/problems/flattening-a-linked-list/1


/*

Brute - using sorting

Time Complexity: O(N*M) + O(N*M log(N*M)) + O(N*M)where N is the length of the linked list along the next pointer and M is the length of the linked list along the child pointer.

O(N*M) as we traverse through all the elements, iterating through ‘N’ nodes along the next pointer and ‘M’ nodes along the child pointer.
O(N*M log(N*M)) as we sort the array containing N*M (total) elements.
O(N*M) as we reconstruct the linked list from the sorted array by iterating over the N*M elements of the array.
Space Complexity : O(N*M) + O(N*M)where N is the length of the linked list along the next pointer and M is the length of the linked list along the child pointer.

O(N*M) for storing all the elements in an additional array for sorting.
O(N*M) to reconstruct the linked list from the array after sorting
*/

/*
class Node {
  constructor(x){
    this.data = x;
    this.next = null;
    this.bottom = null;
  }
}
*/

/**
 * @param {Node} head
 * @return {Node}
 */

class Solution {
    flatten(root) {
        // code here
        const arr = []
        
        let t1 = root, t2
        while (t1) {
            t2 = t1
            while (t2) { // go down
                arr.push(t2.data)
                t2 = t2.bottom
            }
            
            t1 = t1.next // go next
        }
        
        arr.sort((a, b) => a - b)
        if (arr.length === 0) return null
        
        const head = new Node(arr[0])
        let temp = head
        for(let i = 1; i < arr.length; i++) { // create a new ll
            temp.bottom = new Node(arr[i])
            temp = temp.bottom
        }
        
        return head
    }
}

/*
Better - Using merging
O(n * n * m) & O(n)

After adding the first 2 lists, the time taken will be O(m+m) = O(2m).
Then we will merge another list to above merged list -> time = O(2m + m) = O(3m).
We will keep merging lists to previously merged lists until all lists are merged.
Total time taken will be O(2m + 3m + 4m + .... n*m) = (2 + 3 + 4 + ... + n) * m = O(n * n * m)
*/

const mergeTwoLists = (t1, t2) => {
    const dummyNode = new Node(0)
    let curr = dummyNode
    
    while (t1 && t2) {
        if (t1.data <= t2.data) {
            curr.bottom = t1
            t1 = t1.bottom
        } else {
            curr.bottom = t2
            t2 = t2.bottom
        }
        
        curr = curr.bottom
    }
    
    if (t1) {
        curr.bottom = t1
    } else {
        curr.bottom = t2
    }
    
    return dummyNode.bottom
}
class Solution {
    flatten(root) {
        // code here
        if (root === null || root.next === null) {
            return root
        }
        
        const node = this.flatten(root.next) // this wil return the last ll first and then we start merging from backwards
        const mergedNode = mergeTwoLists(node, root) // keep merging two lists
        
        return mergedNode
    }
}

/*
Optimal

O(nlogn) + O(n*m*logn) & O(n)

Initial inserts - O(nlogn) - insert takes logn and we run for n elements
Total nodes - n*m
for each node, logn for insert and pop, so O(n*m*logn). Heap will have only n elements, but for n*m the loop runs.


*/

function flatten(head) {
    if (!head) return null;

    const minHeap = new MinHeap();

    // Insert all heads of the linked lists into the heap
    let curr = head;
    while (curr) {
        minHeap.insert(curr);
        curr = curr.next;
    }

    let dummy = new Node(0);
    let tail = dummy;

    while (!minHeap.isEmpty()) {
        let minNode = minHeap.extractMin();
        tail.bottom = minNode;
        tail = tail.bottom;

        // If the extracted node has a bottom, insert it into the heap
        if (minNode.bottom) {
            minHeap.insert(minNode.bottom);
        }
    }

    // The flattened list is attached to dummy.bottom
    return dummy.bottom;
}