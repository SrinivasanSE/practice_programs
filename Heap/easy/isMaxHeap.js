// https://www.geeksforgeeks.org/how-to-check-if-a-given-array-represents-a-binary-heap/



class Solution{
    
    isMaxHeap(n,arr){
        //code here
        for(let i = 0; i <= Math.floor(n/2) - 1; i++) { // Checking internal nodes alone
            if (arr[i] < arr[2*i + 1] || arr[i] < arr[2*i + 2]) {
                return false
            }
        }
        
        return true
    }
}

function isHeap(arr,i,n) 
{ 
    // If (2 * i) + 1 >= n, then leaf node, so return true 
        if (i >= (n - 1) / 2) 
        { 
            return true; 
        } 
   
        // If an internal node and 
        // is greater than its 
        // children, and same is 
        // recursively true for the 
        // children 
        if (arr[i] >= arr[2 * i + 1] 
            && arr[i] >= arr[2 * i + 2] 
            && isHeap(arr, 2 * i + 1, n) 
            && isHeap(arr, 2 * i + 2, n)) 
        { 
            return true; 
        } 
   
        return false; 
} 