// https://leetcode.com/problems/rearrange-array-elements-by-sign/description/


/*

Brute Force

O(2n) & O(n)

*/

var rearrangeArray = function(nums) {
    const n = nums.length
    const positives = []
    const negatives = []

    for(let i = 0; i < n; i++) {
        if (nums[i] < 0) {
            negatives.push(nums[i])
        } else {
            positives.push(nums[i])
        }
    }
    for(let i = 0; i < n/2; i++) { // will work only for equal no of positives and negatives
        nums[2*i] = positives[i]
        nums[2*i + 1] = negatives[i]
    }

    return nums
};

/*
Optimal 
O(n) & O(n)

*/

var rearrangeArray = function(nums) {
    const n = nums.length
    let pos = 0
    let neg = 1
    let res = new Array(n)

    for(let num of nums) {
        if (num < 0) {
            res[neg] = num
            neg+=2
        } else {
            res[pos] = num
            pos+=2
        }
    }
    return res
};


// ---------------------------------------Check this later-------------------------------

// If the count of positive and negatives are not equal

/*
Brute Force approach - O(2n) & O(n)
*/

function RearrangebySign(A) {
    
  let n = A.length;
  
  // Define 2 arrays, one for storing positive 
  // and other for negative elements of the array.
  let pos = [];
  let neg = [];
  
  // Segregate the array into positives and negatives.
  for(let i=0;i<n;i++){
      
      if(A[i]>0) pos.push(A[i]);
      else neg.push(A[i]);
  }
  
  // If positives are lesser than the negatives.
  if(pos.length < neg.length){
      
    // First, fill array alternatively till the point 
    // where positives and negatives are equal in number.
    for(let i=0;i<pos.length;i++){
      
      A[2*i] = pos[i];
      A[2*i+1] = neg[i];
    }
    
    // Fill the remaining negatives at the end of the array.
    let index = pos.length*2;
    for(let i = pos.length;i<neg.length;i++){
        
        A[index] = neg[i];
        index++;
    }
  }
  
  // If negatives are lesser than the positives.
  else{
      
      // First, fill array alternatively till the point 
      // where positives and negatives are equal in number.
      for(let i=0;i<neg.length;i++){
      
      A[2*i] = pos[i];
      A[2*i+1] = neg[i];
  }
    
    // Fill the remaining positives at the end of the array.
    let index = neg.length*2;
    for(let i = neg.length;i<pos.length;i++){
        
        A[index] = pos[i];
        index++;
    }
  }
  return A;
    
}

