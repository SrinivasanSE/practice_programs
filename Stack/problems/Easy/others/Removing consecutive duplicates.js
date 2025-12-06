// https://www.geeksforgeeks.org/problems/removing-consecutive-duplicates-1587115621/1?page=1&category=Stack&difficulty=Easy&status=unsolved&sortBy=submissions


class Solution 
{
    //Function to remove consecutive duplicates from given string using Stack.
    removeConsecutiveDuplicates(s)
    {
        //your code here
        let str = ""
        for(let i = 0; i < s.length; i++) {
            if(str.length === 0) {
                str += s[i]
            } else {
                if(str[str.length - 1] != s[i]) {
                    str += s[i]
                }
            }
        }
        
        return str
    }
}


class Solution 
{
    //Function to remove consecutive duplicates from given string using Stack.
    removeConsecutiveDuplicates(s)
    {
        let temp = s.split("")
        
        let stack = []
        let top = -1
        let res = ""
        stack.push(temp[0])
        top+=1
        
        for(let i = 1; i < temp.length; i++) {
            
            if (temp[i] != stack[top]) {
                res+= stack[top] // adding stack top to the res
                stack.pop()
                stack.push(temp[i])
            }
        }
        
        res += stack[top]
        
        return res
        
    }
}



// Removing consecutive duplicates - 2

// https://www.geeksforgeeks.org/problems/removing-consecutive-duplicates-2-1587115621/1?page=1&category=Stack&difficulty=Easy&status=unsolved&sortBy=submissions

class Solution 
{
    //Function to remove pair of duplicates from given string using Stack.
    removePair(s)
    {
        //your code here
        let temp = s.split("")
        let stack = []
        let top = -1
        
        stack.push(temp[0])
        top+=1
        
        for(let i = 1; i < temp.length; i++) {
            if (top >= 0 && stack[top] === temp[i]) {
                stack.pop()
                top--
            } else {
                stack.push(temp[i])
                top++
            }
        }
        /*

        let ans='';
        
        //adding all characters in the stack to the answer and returning it.
        while(top !== -1)
        {
            ans = stack[top] + ans;
            stack.pop();
            top--;
        }
        return ans;
        */
        
        return stack.join('')
    }
}
