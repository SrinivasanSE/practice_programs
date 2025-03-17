// https://www.geeksforgeeks.org/program-to-insert-an-element-at-the-bottom-of-a-stack/


class Solution {
    //Function to insert an element at the bottom of a stack.
    insertAtBottom(st, x) {
        //your code here
        
        let temp = []
        
        while(st.length != 0) {
            temp.push(st.pop())
        }
        
        st.push(x)
        
        while(temp.length != 0) {
            st.push(temp.pop())
        }
        
        return st
    }
}

//recursion
class Solution {
    //Function to insert an element at the bottom of a stack.
    insertAtBottom(st, x) {
        //your code here
        if (st.length === 0) {
            st.push(x)
        } else {
            const top = st.pop()
            
            this.insertAtBottom(st, x)
            
            st.push(top)
        }
        
        return st
    }
}