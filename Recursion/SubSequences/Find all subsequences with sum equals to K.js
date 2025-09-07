// https://www.geeksforgeeks.org/dsa/find-all-subsequences-with-sum-equals-to-k/


// Recursive function to generate all
// subsequences with sum of elements k
function findSubsequence(ind, sum, k, cur, arr, res) {
    let n = arr.length;
    
    // base case
    if (ind === n) {
        
        // check if sum of elements of current
        // subset is equal to k
        if (sum === k) {
            
            // add the subset in result
            res.push(cur.slice());
        }
        return;
    }
    
    // add the current element in subset
    cur.push(arr[ind]);
    findSubsequence(ind + 1, sum + arr[ind], k, cur, arr, res);
    
    // remove the added element
    cur.pop();
     // skip the current element arr[ind]
    findSubsequence(ind + 1, sum, k, cur, arr, res);
}
 
// Function to find the subsequences
// with sum of its elements k
function subsequencesSumK(arr, k) {
    
    // to store the subsequences
    // with sum of its elements k
    let res = [];
    
    // to store the current subset
    let cur = [];
    
    findSubsequence(0, 0, k, cur, arr, res);
    
    return res;
}
 
// For printing only one result

function findSubsequence(ind, sum, k, cur, arr, res) {
    let n = arr.length;
    
    // base case
    if (ind === n) {
        
        // check if sum of elements of current
        // subset is equal to k
        if (sum === k) {
            
           console.log(cur)
           return true
        }
        return false;
    }
    
    // add the current element in subset
    cur.push(arr[ind]);
    if (findSubsequence(ind + 1, sum + arr[ind], k, cur, arr, res) == true) return true
    
    // remove the added element
    cur.pop();
     // skip the current element arr[ind]
    if (findSubsequence(ind + 1, sum, k, cur, arr, res) == true) return true

    return false
}
 
// Function to find the subsequences
// with sum of its elements k
function subsequencesSumK(arr, k) {
    
    // to store the subsequences
    // with sum of its elements k
    
    // to store the current subset
    let cur = [];
    
    findSubsequence(0, 0, k, cur, arr, res);
    
    return res;
}