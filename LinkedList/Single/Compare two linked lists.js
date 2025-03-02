// https://www.geeksforgeeks.org/compare-two-strings-represented-as-linked-lists/


compare(head1, head2) {
        // code here
        let str1 = "",str2 = ""
        
        while(head1) {
            str1 += head1.data
            head1 = head1.next
            
        }
        
        while(head2) {
            str2 += head2.data
            head2 = head2.next
        }
        //console.log(str1, str2)
        if (str1 === str2) {
            return 0
        }
        
        if (str1 > str2) {
            return 1
        }
        
        return -1
    }


compare(head1, head2) {
        // Traverse both lists. Stop when either end of linked
        // list is reached or current nodes don't match
        while (head1 !== null && head2 !== null && head1.data === head2.data) {
            head1 = head1.next; // Move to the next node in head1
            head2 = head2.next; // Move to the next node in head2
        }

        // If both lists are not empty, compare mismatching nodes
        if (head1 !== null && head2 !== null) {
            return (head1.data > head2.data) ? 1 : -1;
        }

        // If either of the two lists has reached end
        if (head1 !== null && head2 === null) {
            return 1; // head1 is longer
        }

        if (head1 === null && head2 !== null) {
            return -1; // head2 is longer
        }

        // Both lists have been completely compared and have the same values
        return 0;
    }
