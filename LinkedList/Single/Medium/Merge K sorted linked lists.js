// https://www.geeksforgeeks.org/merge-k-sorted-linked-lists/

// revisit this after heap and divide and conquer algo learn, those sols needs to be added

class Solution {
    // Function to merge K sorted linked list.
    
    findMin(arr) {
        let mini  = null
        let index = -1
        // we iterate through the first element in each element in the array, once we consider a element, it will be pointed to the next element
        for(let i = 0; i < arr.length; i++) {
            
            if(arr[i] === null) { // if all the elements are processed, it would be null at the end
                continue
            }
            if (!mini || arr[i].data < mini.data) {
                mini = arr[i]
                index = i
            }
        }
        
        if(index !== -1) arr[index] = arr[index].next
        return mini
    }
    
    mergeKLists(arr) {
        // your code here
        let dummy = new Node(-1)
        let temp = dummy
        let min = this.findMin(arr)
        while(min) {
            temp.next = min
            temp = min
            
            min = this.findMin(arr)
        }
        
        return dummy.next
       
    }
}

class Solution {
    // Function to merge K sorted linked list.
    merge(p1, p2) {
        let dummy = new Node(0)
        let temp = dummy
        
        while(p1 && p2) {
            if (p1.data <= p2.data) {
                temp.next = p1
                p1 = p1.next
            } else {
                temp.next = p2
                p2 = p2.next
            }
            temp = temp.next
        }
        
        if(p1) {
            temp.next = p1
        }
        if (p2) {
            temp.next = p2
        }
        
        return dummy.next
    }
    mergeKLists(arr) {
        // your code here
        let first = arr[0]
        for(let i = 1; i < arr.length; i++) {
            first = this.merge(first, arr[i])
        }
        return first
    }
}
