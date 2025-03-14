// https://www.geeksforgeeks.org/problems/make-the-array-beautiful--170647/1?page=1&category=Stack&difficulty=Easy&status=unsolved&sortBy=submissions


class Solution
{
    //Function to make the given array beautiful.
    makeBeautiful(arr)
    {
        //your code here
        let s = []
        s.push(arr[0])
        let top = 0
        for(let i = 1; i < arr.length; i++) {
            if ( top >= 0 && (s[top] < 0 && arr[i] >= 0) || (s[top] >= 0 && arr[i] < 0)) {
                s.pop()
                top--
            }  else {
                s.push(arr[i])
                top++
            }
        }
        
        return s
    }
}